import { readFile } from "@nore/std/fs";
import yaml from "js-yaml";

export default async function readYAMLFile(path) {
	try {
		return yaml.safeLoad(await readFile(path));
	} catch (error) {
		throw Error(`while parsing ${path}. \n${error}`);
	}
}
