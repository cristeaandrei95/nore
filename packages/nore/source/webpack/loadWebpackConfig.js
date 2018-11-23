import { itExists } from "@nore/std/fs";
import merge from "webpack-merge";
import baseConfig from "./baseConfig";

async function loadExternalConfig(bundle, config) {
	const files = [
		`${bundle.configPath}/${bundle.handle}.${bundle.mode}.webpack.js`,
		`${bundle.configPath}/${bundle.handle}.webpack.js`,
	];

	for (const file of files) {
		if (await itExists(file)) {
			const extend = require(file);

			return await extend(config, bundle);
		}
	}
}

export default async bundle => {
	const base = baseConfig(bundle);
	const fromPlugins = bundle.webpackConfig;
	const config = merge(base, ...fromPlugins);
	const external = await loadExternalConfig(bundle, config);

	return merge(config, external || {});
};
