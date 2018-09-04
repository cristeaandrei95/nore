import pino from "pino";
import { isObject } from "@nore/std/assert";
import { isAbsolute } from "@nore/std/path";
import { merge } from "@nore/std/object";
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

		this.log = pino({
			base: { name: "nore" },
			level: this.isDebug ? "debug" : "info",
		});

		// plugins cache
		this.plugins = new Set(options.plugins);
		this.bundles = new Map();

		this.log.debug({ action: "nore:constructor", options });
	}

	plug(namespace, api) {
		if (this[namespace]) {
			throw Error(`Namespace "${namespace}" was already defined.`);
		}

		if (!isObject(api)) {
			throw Error(`The API for "${namespace}" is not an object.`);
		}

		this.log.debug({ action: "plugin:add", name: namespace });

		this[namespace] = api;
	}

	// helper to easily load files based on project path
	async load(request) {
		this.log.debug({ action: "nore:load", request });

		if (isAbsolute(request)) {
			return loadFile(request);
		} else {
			return loadFile(this.path, request);
		}
	}

	async bundle(options, defaults) {
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

		const config = await this.load(
			`${this.path}/config/${options.handle}.${this.mode}`
		);

		options.path = this.path;
		options.mode = this.mode;
		options.isDebug = this.isDebug;
		options.config = merge(defaults, config);

		const bundle = new Bundle(options);

		await this.emit("nore:bundle", bundle);

		this.bundles.set(bundle.handle, bundle);
		this.log.debug({ action: "nore:bundle", handle: bundle.handle });
	}

	async initialize() {
		// initialize plugins
		for (const plugin of this.plugins) {
			await Promise.resolve(plugin(this));
		}

		this.log.debug({ action: "nore:initialize" });
	}
}
