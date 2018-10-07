import { itExists } from "@nore/std/fs";

export default async (bundle, config) => {
	const file = `${bundle.configPath}/${bundle.handle}.babel.js`;

	if (await itExists(file)) {
		const extend = require(file).default;

		await Promise.resolve(extend(config, bundle));
	}
};
