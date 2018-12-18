import { itExists } from "@nore/std/fs";
import { isFunction } from "@nore/std/assert";
import merge from "webpack-merge";

export default async function loadExternalConfig(bundle, config) {
	const files = [
		`${bundle.configPath}/${bundle.handle}.${bundle.mode}.webpack.js`,
		`${bundle.configPath}/${bundle.handle}.webpack.js`,
	];

	for (const file of files) {
		if (await itExists(file)) {
			const extend = require(file).default;

			return isFunction(extend) ? await extend(config, bundle) : extend;
		}
	}
}
