import { itExists } from "@nore/std/fs";
import merge from "webpack-merge";
import getConfig from "./getConfig";

async function loadExternalConfig(bundle, config) {
	const files = [
		`${bundle.configPath}/${bundle.handle}.${bundle.mode}.webpack.js`,
		`${bundle.configPath}/${bundle.handle}.webpack.js`,
	];

	for (const file of files) {
		if (await itExists(file)) {
			const extend = require(file);

			return await Promise.resolve(extend(config, bundle));
		}
	}
}

export default async bundle => {
	const defaults = getConfig(bundle);
	const fromPlugins = bundle.webpackConfig.values();
	const config = merge(defaults, ...fromPlugins);
	const external = await loadExternalConfig(bundle, config);

	return merge(config, external || {});
};
