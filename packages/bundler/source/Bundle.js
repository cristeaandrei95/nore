import { join, isAbsolute } from "@nore/std/path";
import { isObject } from "@nore/std/assert";
import merge from "webpack-merge";
import webpack from "webpack";
import pino from "pino";
import Emitter from "./utils/Emitter.js";
import loadFile from "./utils/loadFile.js";
import devServerWeb from "./core/devServerWeb.js";
import getWebpackConfig from "./webpack/getConfig.js";
import loadExternalWebpackConfig from "./webpack/loadExternalConfig.js";
import plugins from "./plugins.js";

export default class Bundle extends Emitter {
	constructor(options = {}) {
		super();

		if (!options.handle) {
			throw Error("Bundle is missing `.handle`");
		}

		this.config = options;
		this.handle = options.handle;
		this.type = options.type || "web";
		this.mode = options.mode || "development";

		// set flags
		this.isDebug = options.isDebug || false;
		this.isForWeb = this.type === "web";
		this.isForNode = this.type === "node";
		this.isDevelopment = this.mode === "development";

		// set paths
		const { path, sourcePath, outputPath, cachePath, publicPath } = options;

		this.path = path || process.cwd();
		this.publicPath = publicPath || "/";
		this.sourcePath = join(path, sourcePath || "source");
		this.outputPath = join(path, outputPath || `.builds/${this.handle}`);
		this.cachePath = join(path, cachePath || `${this.outputPath}/cache`);

		// webpack config
		this.webpack = merge(getWebpackConfig(this), options.webpack);

		// set up logger
		this.log = pino({
			name: "nore",
			level: this.isDebug ? "debug" : "info",
		});

		// setup plugins
		this.plugins = options.plugins || [];

		for (const name in plugins) {
			const plugin = plugins[name];
			const settings = options[name] || {};

			this.plugins.unshift(plugin(settings));
		}
	}

	async initialize() {
		// initialize plugins
		for (const plugin of this.plugins) {
			await plugin(this);
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

	async compiler() {
		// load external webpack config
		const external = await loadExternalWebpackConfig(this, this.webpack);
		const config = merge(this.webpack, external);
		const compiler = webpack(config);

		return compiler;
	}

	async serve() {
		if (this.isForWeb) {
			await devServerWeb(this);
		}
	}

	setConfig(config) {
		this.webpack = merge(this.webpack, config);
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
