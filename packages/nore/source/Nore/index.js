import { isFunction } from "@nore/std/assert";
import logger from "../util/log";
import loadFile from "./loadFile.js";

export default class Platform {
	constructor(options = {}) {
		// set default settings
		this.path = options.path || process.cwd();
		this.mode = options.mode || "development";
		this.isDebug = options.debug || false;

		// plugins cache
		this.plugins = new Set(options.plugins);

		// store event handlers
		this.events = new Map();
	}

	on(event, handler) {
		const { events } = this;

		if (!events.has(event)) {
			events.set(event, new Set());
		}

		events.get(event).add(handler);
	}

	off(event, handler) {
		const { events } = this;

		if (!events.has(event)) {
			return events.get(event).delete(handler);
		}
	}

	emit(event, ...args) {
		const { events } = this;
		const handlers = [];

		if (events.has(event)) {
			for (const handler of events.get(event)) {
				handlers.push(handler(...args));
			}
		}

		return Promise.all(handlers);
	}

	plug(namespace, api) {
		if (this[namespace]) {
			throw Error(`Namespace "${namespace}" was already defined.`);
		}

		this[namespace] = isFunction(api) ? api(this) : api;
	}

	log(...msg) {
		logger(...msg);
	}

	async load(request) {
		return await loadFile(request, this.path);
	}

	async initialize() {
		// initialize plugins
		for (const plugin of this.plugins) {
			if (!plugin.isLoaded) {
				await Promise.resolve(plugin(this));

				plugin.isLoaded = true;
			}
		}
	}
}
