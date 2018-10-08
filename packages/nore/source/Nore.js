import pino from "pino";
import { isObject } from "@nore/std/assert";
import { isAbsolute } from "@nore/std/path";
import Events from "./util/Events.js";
import loadFile from "./util/loadFile.js";
import loadBundles from "./loadBundles.js";

export default class Platform extends Events {
	constructor(options = {}) {
		super();

		// set default settings
		this.path = options.path || process.cwd();
		this.mode = options.mode || "development";
		this.handles = options.handles || [];
		this.isDebug = options.debug || false;

		this.plugins = new Set(options.plugins);
		this.bundles = new Set();

		this.log = pino({
			base: { name: "nore" },
			level: this.isDebug ? "debug" : "info",
		});
	}

	async initialize() {
		// initialize plugins
		for (const plugin of this.plugins) {
			await Promise.resolve(plugin(this));
		}

		const bundles = await loadBundles({
			handles: this.handles,
			path: this.path,
			mode: this.mode,
		});

		for (const bundle of bundles) {
			await this.emit("nore:bundle", bundle);

			this.bundles.add(bundle);
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
