import { isObject } from "@nore/std/assert";
import { isAbsolute } from "@nore/std/path";
import pino from "pino";
import Emitter from "./Emitter.js";
import loadFile from "../utils/loadFile.js";

export default class Nore extends Emitter {
	constructor(options = {}) {
		super();

		// set default settings
		this.path = options.path || process.cwd();
		this.mode = options.mode || "development";
		this.isDebug = options.debug || false;

		this.plugins = new Set(options.plugins);
		this.bundles = new Set(options.bundles);

		this.log = pino({
			name: "nore",
			level: this.isDebug ? "debug" : "info",
		});
	}

	async initialize() {
		// initialize plugins
		for (const plugin of this.plugins) {
			await plugin(this);
		}

		for (const bundle of this.bundles) {
			await this.emit("bundle", bundle);
		}
	}

	// helper to easily load files based on project path
	async load(request) {
		if (isAbsolute(request)) {
			return loadFile(request);
		} else {
			return loadFile(this.path, request);
		}
	}

	plug(namespace, api) {
		if (this[namespace]) {
			throw Error(`Namespace "${namespace}" was already defined.`);
		}

		if (!isObject(api)) {
			throw Error(`The API for "${namespace}" is not an object.`);
		}

		this[namespace] = api;
	}
}
