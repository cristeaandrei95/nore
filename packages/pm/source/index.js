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
		clearTimeout(this._spawnTimeoutId);

		// spawn child process
		this._spawn();

		// return on next loop cycle, allow handlers to set up
		return new Promise(resolve => setImmediate(resolve));
	}

	async stop() {
		// ignore command during the following statuses
		if (["stopped", "stopping", "crashed"].includes(this.status)) return;

		this.status = "stopping";

		if (!this.process) {
			return this._stopped();
		}

		const { killTimeout } = this.options;

		if (killTimeout !== null) {
			const delayedKill = () => {
				kill(this.process.pid, "SIGKILL");
				this.emit("sigkill");
			};

			const killTimeoutId = setTimeout(delayedKill, killTimeout);

			this.process.on("exit", () => {
				clearTimeout(killTimeoutId);
			});
		}

		kill(this.process.pid);
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
			this.emit("exit", code, signal);

			if (this.status === "stopping") {
				return this._stopped();
			}

			this._clock -=
				Date.now() - (this._spawnedAt ? this._spawnedAt.getTime() : 0);

			if (this._clock <= 0) {
				this._clock = 60000;
				this._restarts = 0;
			}

			if (options.restartLimit !== null) {
				if (++this._restarts > options.restartLimit) {
					return this._stopped();
				}
			}

			this.status = "sleeping";
			this.emit("sleep");

			this._spawnTimeoutId = setTimeout(
				this._spawn.bind(this),
				this.options.restartDelay
			);
		});

		process.on("error", error => {
			this.emit("error", error);

			if (this.status === "stopping") {
				return this._stopped("crashed");
			}

			this._stopped("crashed");
		});

		process.on("message", message => {
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

	_stopped(status) {
		this.status = this.status === "stopping" ? "stopped" : "crashed";
		this.emit("stop", this.process);

		this._reset();
	}

	_reset() {
		if (this._spawnTimeoutId) {
			clearTimeout(this._spawnTimeoutId);
		}

		this.process = null;
		this._spawnTimeoutId = null;
		this._spawnedAt = null;
		this._restarts = 0;
		this._clock = 60000;
	}
}
