import { readDirectory, itExists } from "@nore/std/fs";
import { getFileName } from "@nore/std/path";
import { loadFile } from "@nore/bundler";

async function getConfigFiles(path, mode) {
	const files = await readDirectory(`${path}/config`);
	const suffixes = loadFile.extensions.map(ext => `.${mode}${ext}`);
	const isConfig = file => suffixes.some(suffix => file.includes(suffix));

	return files.filter(isConfig);
}

function getHandle(file) {
	return getFileName(file)
		.split(".")
		.shift();
}

export default async ({ path, mode, isDebug }) => {
	const files = await getConfigFiles(path, mode);
	const configs = [];

	for (const file of files) {
		const module = await loadFile(file);
		const config = module.default;

		// ignore bundle from loading
		if (config.ignore) continue;

		config.path = path;
		config.mode = mode;
		config.isDebug = isDebug;

		if (!config.handle) {
			config.handle = getHandle(file);
		}

		configs.push(config);
	}

	return configs;
};
