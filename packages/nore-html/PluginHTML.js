import { SyncWaterfallHook, AsyncSeriesWaterfallHook } from "tapable";
import { merge } from "@nore/std/object";
import { join } from "@nore/std/path";
import compileTemplate from "./compileTemplate.js";

const defaults = {
	template: "template.html",
	output: "index.html",
};

export default class PluginHTML {
	constructor(options = {}) {
		this.options = merge(defaults, options);
	}

	apply(compiler) {
		const { template, output } = this.options;
		const { context, hooks } = compiler;

		hooks.compilation.tap("pluginHTML", compilation => {
			// crate plugin hooks here
		});

		hooks.make.tapAsync("pluginHTML", (compilation, callback) => {
			const source = compileTemplate({
				compilation,
				template,
				context,
				target: output,
			});
		});
	}
}
