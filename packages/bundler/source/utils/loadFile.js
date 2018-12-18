import { itExists } from "@nore/std/fs";
import { join } from "@nore/std/path";
import readTOMLFile from "./readTOMLFile.js";
import readYAMLFile from "./readYAMLFile.js";

const extensions = [".js", ".json", ".yaml", ".toml"];
const TOML = /\.toml$/;
const YAML = /\.yaml$/;

async function tryFiles(...files) {
	for (const file of files) {
		if (await itExists(file)) {
			if (TOML.test(file)) {
				return readTOMLFile(file);
			}

			if (YAML.test(file)) {
				return readYAMLFile(file);
			}

			return require(file);
		}
	}
}

async function loadFile(...paths) {
	const file = join.apply(null, paths);
	const files = extensions.map(ext => file + ext);

	return tryFiles(file, ...files);
}

loadFile.extensions = extensions;

export default loadFile;
