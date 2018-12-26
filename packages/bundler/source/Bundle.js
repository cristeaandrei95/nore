import { join, isAbsolute } from "@nore/std/path";
import { isObject } from "@nore/std/assert";
import webpackMerge from "webpack-merge";
import webpack from "webpack";
import Emitter from "./utils/Emitter.js";
import loadFile from "./utils/loadFile.js";
import webServer from "./server/web.js";
import nodeServer from "./server/node.js";
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
		this.target = options.target || "web";
		this.mode = options.mode || "development";

		// set flags
		this.isDebug = options.isDebug || false;
		this.isForWeb = this.target === "web";
		this.isForNode = this.target === "node";
		this.isDevelopment = this.mode === "development";

		// set paths
		const { path, sourcePath, outputPath, cachePath, publicPath, configPath } = options;

		this.path = path || process.cwd();
		this.publicPath = publicPath || "/";
		this.sourcePath = join(path, sourcePath || "source");
		this.outputPath = join(path, outputPath || `.builds/${this.handle}`);
		this.cachePath = join(this.outputPath, cachePath || `cache`);
		this.configPath = join(path, configPath || "config");

		// webpack config
		this.webpackConfig = webpackMerge(getWebpackConfig(this), options.webpack);

		// set up plugins
		this.plugins = plugins.concat(options.plugins || []);
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
		const external = await loadExternalWebpackConfig(this, this.webpackConfig);
		const config = webpackMerge(this.webpackConfig, external);
		const compiler = webpack(config);

		return compiler;
	}

	async serve() {
		if (this.isForWeb) {
			await webServer(this);
		}

		if (this.isForNode) {
			await nodeServer(this);
		}
	}

	setWebpackConfig(config) {
		this.webpackConfig = webpackMerge(this.webpackConfig, config);
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
