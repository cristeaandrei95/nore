import spawn from "cross-spawn";
import Emitter from "./emitter.js";
import kill from "./kill.js";

const { assign } = Object;

const defaults = {
	killTimeout: 30000,
	restartDelay: 1000,
	restartLimit: 0,
};

export default class ProcessManager extends Emitter {
	constructor(cmd, options = {}) {
		super();

		if (!Array.isArray(cmd)) {
			throw Error("Missing or invalid `cmd`.");
		}

		this.options = assign({}, defaults, options);
		this.options.env = assign({}, process.env, options.env);

		this.cmd = cmd;
		this.status = "initial";

		this._reset();
	}

	async start() {
		if (this.status === "running") return;

		// clear any pending restarts
		clearTimeout(this._restartTimeoutId);

		// spawn child process
		this._spawn();

		// return on next loop cycle, allow handlers to set up
		return new Promise(resolve => setImmediate(resolve));
	}

	async stop() {
		// ignore calls if process is not running
		if (this.status !== "running") return;

		this.status = "stopping";

		const { killTimeout } = this.options;
		const { pid } = this.process;

		if (killTimeout !== null) {
			const delayedKill = async () => {
				await kill(pid, "SIGKILL");
				this.emit("sigkill");
			};

			const killTimeoutId = setTimeout(delayedKill, killTimeout);

			this.process.on("exit", () => {
				clearTimeout(killTimeoutId);
			});
		}

		await kill(pid);

		this._stopped();
	}

	async restart() {
		await this.stop();
		await this.start();
	}

	_spawn() {
		const { cmd, options } = this;
		const process = spawn(cmd[0], cmd.slice(1), options);

		process.setMaxListeners(0);

		process.on("exit", (code, signal) => {
			// callback called after new process spawned
			if (this.process !== process) return;

			this.emit("exit", code, signal);

			if (this.status === "stopping") {
				return this._stopped();
			}

			if (options.restartLimit !== null) {
				if (++this._restarts > options.restartLimit) {
					return this._stopped();
				}
			}

			this.status = "sleeping";
			this.emit("sleep");

			this._restartTimeoutId = setTimeout(
				this._spawn.bind(this),
				this.options.restartDelay
			);
		});

		process.on("error", error => {
			// callback called after new process spawned
			if (this.process !== process) return;

			this.emit("error", error);
			this._stopped();
		});

		process.on("message", message => {
			// callback called after new process spawned
			if (this.process !== process) return;

			this.emit("message", message);
		});

		if (this._events.has("data")) {
			process.on("data", this.emit.bind(this, "data"));
		}

		this._spawnedAt = new Date();
		this.status = "running";
		this.process = process;

		this.emit("spawn", process);
	}

	_stopped() {
		this.status = this.status === "stopping" ? "stopped" : "crashed";
		this.emit("stop", this.process);

		this._reset();
	}

	_reset() {
		if (this._restartTimeoutId) {
			clearTimeout(this._restartTimeoutId);
		}

		this._restartTimeoutId = null;
		this._spawnedAt = null;
		this._restarts = 0;
	}
}
