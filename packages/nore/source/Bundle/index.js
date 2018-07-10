import webpack from "webpack";
import merge from "webpack-merge";
import { isAbsolute, join } from "@nore/std/path";
import { itExists } from "@nore/std/fs";
import { HookSync, HookAsync } from "../util/hooks.js";
import getWebpackConfig from "./config.js";

const defaults = {
	mode: "development",
	target: "browser",
};

export default class Bundle {
	constructor(options) {
		// set defaults if no options provided
		for (const key in defaults) {
			this[key] = options[key] || defaults[key];
		}

		// TODO: add error handling for required options
		this.handle = options.handle;
		this.path = options.path;

		this.variables = options.variables || {};
		this.config = options.config || {};

		// file paths
		this.source = options.source || `source/${this.handle}`;
		this.output = options.output || `.bundles/${this.handle}`;
		this.webpack = options.webpack || `source/webpack.${this.handle}.js`;

		// resolve file paths
		for (const field of ["source", "output", "webpack"]) {
			if (!isAbsolute(this[field])) {
				this[field] = join(this.path, this[field]);
			}
		}

		this.isDevelopment = this.mode === "development";
		this.isForNode = this.target === "node";
		this.isForWeb = this.target === "web";

		this.$webpackConfig = new Map();
		this.compiler = null;

		// set up bundle hooks
		this.hooks = {
			compiler: new HookSync("compiler"),
		};
	}

	register(type, config) {
		this.$webpackConfig.set(type, config);
	}

	async makeCompiler() {
		// base webpack config
		const configs = [getWebpackConfig(this)];

		// push webpack configs added by plugins
		if (this.$webpackConfig.size) {
			configs.push(...this.$webpackConfig.values());
		}

		// push external webpack configuration
		if (await itExists(this.webpack)) {
			configs.push(require(this.webpack));
		}

		this.compiler = webpack(merge(...configs));
		this.hooks.compiler.call(this.compiler);
	}

	async compile() {
		await this.makeCompiler();

		return new Promise((resolve, reject) => {
			this.compiler.run((error, stats) => {
				if (error) reject(error);
				else resolve(stats);
			});
		});
	}
}
