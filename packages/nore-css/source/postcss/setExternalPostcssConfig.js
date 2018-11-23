import { itExists } from "@nore/std/fs";

export default async (bundle, config) => {
	const files = [
		`${bundle.configPath}/${bundle.handle}.${bundle.mode}.postcss.js`,
		`${bundle.configPath}/${bundle.handle}.postcss.js`,
	];

	for (const file of files) {
		if (await itExists(file)) {
			const extend = require(file).default;

			await extend(config, bundle);
		}
	}
};
