import toml from "toml";
import yaml from "js-yaml";
import { itExists, readFile } from "@nore/std/fs";

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

	return require(source);
}

export async function tryFiles(files) {
	for (const file of files) {
		if (await itExists(file)) {
			return await loadFile(file);
		}
	}
}
