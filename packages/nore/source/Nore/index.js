import pino from "pino";
import { isObject } from "@nore/std/assert";
import { isAbsolute } from "@nore/std/path";
import Bundle from "./Bundle.js";
import Events from "../util/Events.js";
import loadFile from "../util/loadFile.js";

export default class Platform extends Events {
	constructor(options = {}) {
		super();

		// set default settings
		this.path = options.path || process.cwd();
		this.mode = options.mode || "development";
		this.isDebug = options.debug || false;

		// cache plugins and bundles
		this.plugins = new Set(options.plugins);
		this.bundles = new Map();

		this.log = pino({
			base: { name: "nore" },
			level: this.isDebug ? "debug" : "info",
		});
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

	// helper to easily load files based on project path
	async load(request) {
		if (isAbsolute(request)) {
			return loadFile(request);
		} else {
			return loadFile(this.path, request);
		}
	}

	async bundle(options, config) {
		if (!options.handle) {
			throw Error(
				`Add a handle name for your bundle (options.handle is missing)`
			);
		}

		if (this.bundles.has(options.handle)) {
			throw Error(
				`Bundle handle "${options.handle}" is already used, set another name.`
			);
		}

		options.path = this.path;
		options.mode = this.mode;
		options.isDebug = this.isDebug;
		options.config = config;

		const bundle = new Bundle(options);

		// load config and set defaults
		await bundle.prepare();
		await this.emit("nore:bundle", bundle);

		this.bundles.set(bundle.handle, bundle);
	}

	async initialize() {
		// initialize plugins
		for (const plugin of this.plugins) {
			await Promise.resolve(plugin(this));
		}
	}
}
