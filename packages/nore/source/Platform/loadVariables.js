import { isString } from "@nore/std/assert";
import { assign } from "@nore/std/object";
import { tryFiles } from "../util/loadFiles.js";

const extensions = [".toml", ".js", ".json"];

// default path: source/variables.[toml|js|json]
function getFileFormats(path) {
	return extensions.map(ext => `${path}/source/variables${ext}`);
}

function format(data, prefix) {
	const variables = {};

	for (const key in data) {
		const value = data[key];
		const namespace = prefix ? `${prefix}-${key}` : key;

		if (isString(value)) {
			variables[namespace] = value;
		} else {
			assign(variables, format(value, namespace));
		}
	}

	return variables;
}

export default async path => {
	const data = await tryFiles(getFileFormats(path));

	if (!data) return {};

	return format(data);
};
