import toml from "toml";
import { itExists, readFile } from "@nore/std/fs";

export async function loadFile(file) {
	if (file.includes(".toml")) {
		return toml.parse(await readFile(file));
	} else {
		return require(source);
	}
}

export async function tryFiles(files) {
	for (const file of files) {
		if (await itExists(file)) {
			return await loadFile(file);
		}
	}
}
