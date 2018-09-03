import { itExists } from "@nore/std/fs";
import webpack from "./webpack.js";
import webpackConfig from "./config.js";
import setBundlePaths from "./setBundlePaths.js";

export default class Bundle {
	constructor(options, config = {}) {
		// TODO: add error handling for required options
		this.handle = options.handle;
		this.path = options.path;
		this.mode = options.mode;
		this.target = options.target || "web";

		this.isDevelopment = this.mode === "development";
		this.isForNode = this.target === "node";
		this.isForWeb = this.target === "web";

		// bundle configuration
		this.config = config;

		// webpack configs
		this.webpack = new Map();

		setBundlePaths(this, options);
	}

	register(type, config) {
		this.webpack.set(type, config);
	}

	async compiler() {
		// base webpack config and configs added by plugins
		const configs = [webpackConfig(this), ...this.webpack.values()];

		// push external webpack configuration
		if (await itExists(this.webpackExtend)) {
			const extend = require(this.webpackExtend);

			configs.push(isFunction(extend) ? extend(this) : extend);
		}

		return webpack(await Promise.all(configs));
	}
}
