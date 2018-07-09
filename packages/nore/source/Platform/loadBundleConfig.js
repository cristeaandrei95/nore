import { isString } from "@nore/std/assert";
import { merge } from "@nore/std/object";
import { isAbsolute, join } from "@nore/std/path";
import { loadFile, tryFiles } from "../util/loadFiles.js";

const extensions = [".toml", ".js", ".json"];

// default path: config/[bundle].[mode].[toml|js|json]
function getFileFormats(bundle) {
	return extensions.map(
		ext => `${bundle.path}/config/${bundle.handle}.${bundle.mode}.${ext}`
	);
}

async function loadConfig(bundle) {
	// custom config file path
	if (isString(bundle.config)) {
		let file = bundle.config;

		if (!isAbsolute(file)) {
			file = join(bundle.path, file);
		}

		return await loadFile(file);
	}
	// default config file path
	else {
		return await tryFiles(getFileFormats(bundle));
	}
}

export default async (bundle, defaults = {}) => {
	const config = await loadConfig(bundle);

	return merge(defaults, config || {});
};
