import webpack from "webpack";
import { isAbsolute, join } from "@nore/std/path";
import { merge } from "@nore/std/object";
import loadFile from "../util/loadFile.js";
import getConfig from "./webpack/getConfig";
import loadWebpackConfig from "./webpack/loadWebpackConfig";

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

		this.configPath = `${this.path}/config`;
		this.cachePath = `${this.outputPath}/cache`;

		// webpack configs added by plugins
		this.webpackConfig = new Map();
	}

	register(key, config) {
		this.webpackConfig.set(key, config);
	}

	async loadConfig() {
		const file = `${this.configPath}/${this.handle}.${this.mode}`;
		const content = await loadFile(file);

		this.config = merge(this.config, content || {});
	}

	async prepare() {
		await this.loadConfig();
	}

	async compiler() {
		const config = await loadWebpackConfig(this);
		const compiler = webpack(config);

		return compiler;
	}
}
