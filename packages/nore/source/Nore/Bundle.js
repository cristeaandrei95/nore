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
		this.source = options.source
			? fmtPath(this.path, options.source)
			: `${this.path}/source`;

		this.output = options.output
			? fmtPath(this.path, options.output)
			: `${this.path}/.builds/${this.handle}`;

		this.webpackExtend = options.webpack
			? fmtPath(this.path, options.webpack)
			: `${this.path}/source/webpack.${this.handle}.js`;

		// webpack configs
		this.webpackConfigs = new Map();
	}

	register(type, webpackConfig) {
		this.webpackConfigs.set(type, webpackConfig);
	}

	async compiler() {
		// base webpack config and configs added by plugins
		const configs = [webpackConfig(this), ...this.webpackConfigs.values()];

		// push external webpack configuration
		if (await itExists(this.webpackExtend)) {
			const extendWebpack = require(this.webpackExtend);

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
