import { itExists } from "@nore/std/fs";
import merge from "webpack-merge";
import getConfig from "./getConfig";

async function loadExternalConfig(bundle, config) {
	const file = `${bundle.configPath}/${bundle.handle}.webpack.js`;

	if (await itExists(file)) {
		const extend = require(file);

		return await Promise.resolve(
			isFunction(extend) ? extend(bundle, config) : extend
		);
	}

	return {};
}

export default async bundle => {
	const defaults = getConfig(bundle);
	const fromPlugins = bundle.webpackConfig.values();
	const config = merge(defaults, ...fromPlugins);
	const external = await loadExternalConfig(bundle, config);

	return merge(config, external);
};
