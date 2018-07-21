import toml from "toml";
import yaml from "js-yaml";
import { itExists, readFile } from "@nore/std/fs";
import { isAbsolute, join } from "@nore/std/path";

const extensions = [".yaml", ".toml", ".json", ".js"];

export async function loadFile(file) {
	if (file.includes(".toml")) {
		try {
			return toml.parse(await readFile(file));
		} catch (error) {
			throw Error(`while parsing ${file}. \n${error}`);
		}
	}

	if (file.includes(".yaml")) {
		try {
			return yaml.safeLoad(await readFile(file));
		} catch (error) {
			throw Error(`while parsing ${file}. \n${error}`);
		}
	}

	return require(file);
}

export async function tryFiles(files) {
	for (const file of files) {
		if (await itExists(file)) {
			return await loadFile(file);
		}
	}
}

export default async (request, path) => {
	const file = isAbsolute(request) ? request : join(path, request);
	const files = extensions.map(ext => file + ext);

	return tryFiles([file, ...files]);
};
