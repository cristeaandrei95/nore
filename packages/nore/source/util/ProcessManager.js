import respawn from "respawn";
import { isString } from "@nore/std/assert";
import { assign } from "@nore/std/object";
import Events from "./Events.js";

const defaults = {
	path: process.cwd(),
	stdout: process.stdout,
	stderr: process.stderr,
	name: "node:monitor",
	node: "node",
	restarts: 0,
	args: [],
	env: {},
};

export default class Monitor extends Events {
	constructor(options = {}) {
		super();

		if (!isString(options.file)) {
			throw Error("Missing `file` to run.");
		}

		this.file = options.file;

		for (const key in defaults) {
			this[key] = options[key] || defaults[key];
		}

		this.process = respawn([this.node, this.file, ...this.args], {
			name: this.name,
			cwd: this.path,
			env: this.env,
			stdout: this.stdout,
			stderr: this.stderr,
			maxRestarts: this.restarts,
			// wait 5s before sending SIGKILL
			kill: 5000,
		});

		// this will be emitted once the process will start
		this.$onStartReady = null;

		this.process.on("start", this.onRespawnStart.bind(this));
	}

	get status() {
		return this.process.status;
	}

	onRespawnStart() {
		if (this.$onStartReady) {
			this.$onStartReady();
		}
	}

	async start(isRestarting) {
		await new Promise((resolve, reject) => {
			this.$onStartReady = resolve;
			this.process.start();
		});

		if (!isRestarting) {
			this.emit("start");
		}
	}

	async stop(isRestarting) {
		await new Promise((resolve, reject) => {
			this.process.stop(resolve);
		});

		if (!isRestarting) {
			this.emit("stop");
		}
	}

	async restart() {
		await this.stop(true);
		await this.start(true);

		this.emit("restart");
	}
}
