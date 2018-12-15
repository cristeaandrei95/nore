import { readDirectory, itExists } from "@nore/std/fs";
import { getFileName } from "@nore/std/path";
import loadFile from "../utils/loadFile.js";
import Bundle from "./Bundle.js";

async function getConfigFiles(path, mode) {
	const files = await readDirectory(`${path}/config`);
	const extensions = ["js", "json", "toml", "yaml"];
	const suffixes = extensions.map(ext => `.${mode}.${ext}`);
	const isConfig = file => suffixes.some(suffix => file.includes(suffix));

	return files.filter(isConfig);
}

function getHandle(file) {
	return getFileName(file)
		.split(".")
		.shift();
}

export default async ({ path, mode }) => {
	const configs = await getConfigFiles(path, mode);
	const bundles = [];

	for (const file of configs) {
		const module = await loadFile(file);
		const config = module.default;

		config.path = path;
		config.mode = mode;

		if (!config.handle) {
			config.handle = getHandle(file);
		}

		bundles.push(new Bundle(config));
	}

	return bundles;
};
