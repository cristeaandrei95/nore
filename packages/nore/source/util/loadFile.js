import { itExists } from "@nore/std/fs";
import { join } from "@nore/std/path";
import readTOMLFile from "./readTOMLFile.js";
import readYAMLFile from "./readYAMLFile.js";

const extensions = [".yaml", ".toml", ".json", ".js"];

async function loadFile(file) {
	if (file.includes(".toml")) {
		return readTOMLFile(file);
	}

	if (file.includes(".yaml")) {
		return readYAMLFile(file);
	}

	return require(file);
}

async function tryFiles(...files) {
	for (const file of files) {
		if (await itExists(file)) {
			return await loadFile(file);
		}
	}
}

export default async (...paths) => {
	const file = join.apply(null, paths);
	const files = extensions.map(ext => file + ext);

	return tryFiles(file, ...files);
};
