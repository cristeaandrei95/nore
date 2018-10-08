import { readDirectory, itExists } from "@nore/std/fs";
import { join, getFileName } from "@nore/std/path";
import loadFile from "./util/loadFile.js";
import Bundle from "./Bundle.js";

async function getConfigFiles(path, mode) {
	const extensions = ["js", "json", "toml", "yaml"];
	const suffixes = extensions.map(ext => `.${mode}.${ext}`);
	const files = await readDirectory(`${path}/config`);

	return files.filter(
		file => suffixes.filter(suffix => file.includes(suffix)).length
	);
}

function getHandle(file) {
	return getFileName(file)
		.split(".")
		.shift();
}

function isSkipped(bundle, handles) {
	// use only bundles specified in the CLI?
	if (handles.length) {
		if (!handles.includes(bundle.handle)) return true;
	} else {
		// should the bundle be ignored?
		if (bundle.ignore) return true;
	}
}

export default async ({ path, mode, handles }) => {
	const bundles = [];

	for (const file of await getConfigFiles(path, mode)) {
		const module = await loadFile(file);
		const options = module.default;

		options.handle = options.handle || getHandle(file);
		options.path = path;
		options.mode = mode;

		if (isSkipped(options, handles)) continue;

		bundles.push(new Bundle(options));
	}

	return bundles;
};
