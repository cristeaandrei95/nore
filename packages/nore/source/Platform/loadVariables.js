import { isString } from "@nore/std/assert";
import { assign } from "@nore/std/object";
import { tryFiles } from "../util/loadFiles.js";

export const extensions = [".toml", ".yaml", ".js", ".json"];
export const fileNames = [
	"variables",
	"variables.options",
	"variables.decisions",
];

// default path: source/variables.[yaml|toml|js|json]
function getFileFormats(path, fileName) {
	return extensions.map(ext => `${path}/source/${fileName}${ext}`);
}

function loadFiles(path) {
	return Promise.all(
		fileNames.map(fileName => tryFiles(getFileFormats(path, fileName)))
	);
}

function combine(datasets, fileNames) {
	const variables = {};

	for (let i = 0; i < datasets.length; ++i) {
		const dataset = datasets[i];

		for (const key in dataset) {
			if (variables[key]) {
				throw Error(
					`The namespace "${key}" from "${
						fileNames[i]
					}.yaml" was already declared in "${fileNames[i - 1]}.yaml".`
				);
			}

			variables[key] = dataset[key];
		}
	}

	return variables;
}

function flatten(data, prefix) {
	const variables = {};

	for (const key in data) {
		const value = data[key];
		const namespace = prefix ? `${prefix}.${key}` : key;

		if (isString(value)) {
			variables[namespace] = value;
		} else {
			assign(variables, flatten(value, namespace));
		}
	}

	return variables;
}

function normalize(variables) {
	// a namespace cannot have a value
	// but here we can set it to have it
	// blue: { base: #fff } => $blue == #fff
	for (const variable in variables) {
		if (variable.includes("base") || variable.includes("default")) {
			const namespace = variable.replace(/\.(base|default)/, "");

			if (!variables[namespace]) {
				variables[namespace] = variables[variable];
			}
		}
	}

	return variables;
}

export default async path => {
	const datasets = await loadFiles(path);
	const variables = combine(datasets, fileNames);

	return normalize(flatten(variables));
};
