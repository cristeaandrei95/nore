import respawn from "respawn";
import { isString } from "@nore/std/assert";
import { assign } from "@nore/std/object";
import log from "./log.js";

const defaults = {
	path: process.cwd(),
	stdout: process.stdout,
	stderr: process.stderr,
	name: "node:monitor",
	node: "node",
	restarts: 2,
	args: [],
	env: {},
};

export default class Monitor {
	constructor(options = {}) {
		if (!isString(options.file)) {
			throw new Error("Missing `file` to run.");
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

		this.process.on("start", () => {
			if (this.$onStartReady) {
				this.$onStartReady();
			}
		});
	}

	get status() {
		return this.process.status;
	}

	async start() {
		await new Promise((resolve, reject) => {
			this.$onStartReady = resolve;
			this.process.start();
		});

		log(`process:${this.name}`, "started");
	}

	async stop() {
		await new Promise((resolve, reject) => {
			this.process.stop(resolve);
		});

		log(`process:${this.name}`, "stopped");
	}

	async restart() {
		await this.stop();
		await this.start();
	}
}
