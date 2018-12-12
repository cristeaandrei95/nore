import { readDirectory, itExists } from "@nore/std/fs";
import format from "./format.js";

export default async function loadVariables(path, nore) {
	if (await itExists(path)) {
		const files = await readDirectory(path);
		const datasets = await Promise.all(files.map(file => nore.load(file)));
		const variables = format(datasets, files);

		return variables;
	}
}
