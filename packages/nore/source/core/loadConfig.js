import { itExists } from "@nore/std/fs";
import { merge, assign, keys } from "@nore/std/object";
import plugins from "./plugins";

function getPlugins(options = {}, external = []) {
	return keys(plugins)
		.map(name => plugins[name](options[name]))
		.concat(external);
}

export default async ({ path, mode, isDebug }) => {
	const configFile = `${path}/nore.js`;

	let config = {
		path: path || process.cwd(),
		mode: mode || "development",
		isDebug: !!isDebug,
	};

	if (await itExists(configFile)) {
		const external = require(configFile).default;

		for (const field of keys(config)) {
			if (external[field]) {
				config[field] = external[field];
			}
		}

		config.plugins = getPlugins(external, external.plugins);
	} else {
		config.plugins = getPlugins();
	}

	return config;
};
