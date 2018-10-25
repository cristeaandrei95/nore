import webpack from "webpack";
import { join } from "@nore/std/path";
import loadWebpackConfig from "./webpack/loadWebpackConfig";

export default class Bundle {
	constructor(options = {}) {
		this.handle = options.handle;
		this.mode = options.mode || "development";
		this.target = options.target || "web";
		this.config = options.config || {};

		this.isForNode = this.target === "node";
		this.isForWeb = this.target === "web";
		this.isDevelopment = this.mode === "development";
		this.isDebug = options.isDebug || false;

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
		this.webpackConfig = new Set();
	}

	setWebpack(config) {
		this.webpackConfig.add(config);
	}

	async compiler() {
		const config = await loadWebpackConfig(this);
		const compiler = webpack(config);

		return compiler;
	}
}
