import { itExists } from "@nore/std/fs";
import { isAbsolute, join } from "@nore/std/path";
import merge from "webpack-merge";
import webpack from "webpack";
import webpackConfig from "./webpackConfig.js";

function fmtPath(path, file) {
	return isAbsolute(file) ? file : join(path, file);
}

export default class Bundle {
	constructor(options = {}) {
		this.handle = options.handle;
		this.path = options.path;
		this.mode = options.mode;
		this.target = options.target || "web";
		this.config = options.config || {};

		this.isDebug = options.isDebug || false;
		this.isDevelopment = this.mode === "development";
		this.isForNode = this.target === "node";
		this.isForWeb = this.target === "web";

		// set bundle paths
		this.sourcePath = options.source
			? fmtPath(this.path, options.source)
			: `${this.path}/source`;

		this.outputPath = options.output
			? fmtPath(this.path, options.output)
			: `${this.path}/.builds/${this.handle}`;

		this.webpackExtendPath = options.webpack
			? fmtPath(this.path, options.webpack)
			: `${this.path}/source/webpack.${this.handle}.js`;

		this.cachePath = `${this.outputPath}/cache`;

		// webpack configs
		this.webpackConfigs = new Map();
	}

	register(key, webpackConfig) {
		this.webpackConfigs.set(key, webpackConfig);
	}

	async compiler() {
		// base webpack config and configs added by plugins
		const configs = [...this.webpackConfigs.values(), webpackConfig(this)];

		// push external webpack configuration
		if (await itExists(this.webpackExtendPath)) {
			const extendWebpack = require(this.webpackExtendPath);

			configs.push(
				await Promise.resolve(
					isFunction(extendWebpack)
						? extendWebpack(this, configs)
						: extendWebpack
				)
			);
		}

		return webpack(merge(...configs));
	}
}
