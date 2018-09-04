import { readFile } from "@nore/std/fs";
import toml from "toml";

export default async function readTOMLFile(path) {
	try {
		return toml.parse(await readFile(path));
	} catch (error) {
		throw Error(`while parsing ${path}. \n${error}`);
	}
}
