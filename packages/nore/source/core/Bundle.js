import webpack from "webpack";
import merge from "webpack-merge";
import { join } from "@nore/std/path";
import getWebpackConfig from "../webpack/getConfig.js";
import loadExternalWebpackConfig from "../webpack/loadExternalConfig.js";

export default class Bundle {
	constructor(options = {}) {
		if (!options.handle) {
			throw Error("Bundle is missing `.handle`");
		}

		this.handle = options.handle;
		this.mode = options.mode || "development";
		this.target = options.target || "web";
		this.config = options.config || {};

		this.isDebug = options.isDebug || false;
		this.isForWeb = this.target === "web";
		this.isForNode = this.target === "node";
		this.isDevelopment = this.mode === "development";

		// set bundle paths
		this.path = options.path || process.cwd();

		this.configPath = join(this.path, options.configPath || "config");
		this.sourcePath = join(this.path, options.sourcePath || "source");

		this.outputPath = join(
			this.path,
			options.outputPath || `.builds/${this.handle}`
		);

		this.cachePath = join(
			this.path,
			options.cachePath || `${this.outputPath}/cache`
		);

		// webpack configs added by plugins
		this.webpackConfig = getWebpackConfig(this);
	}

	setConfig(config) {
		this.webpackConfig = merge(this.webpackConfig, config);
	}

	async compiler() {
		const config = this.webpackConfig;
		const external = await loadExternalWebpackConfig(this, config);
		const compiler = webpack(merge(config, external));

		return compiler;
	}
}
