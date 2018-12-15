import { itExists } from "@nore/std/fs";

export default async function loadExternalConfig(bundle, config) {
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
