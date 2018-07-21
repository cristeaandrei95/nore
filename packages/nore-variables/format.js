import { isString } from "@nore/std/assert";
import { assign } from "@nore/std/object";

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

	// repalce variables in values
	const REGEX_VARIABLE = /\$[^\s]+/g;

	for (const name in variables) {
		const value = variables[name];

		if (value.includes("$")) {
			variables[name] = value.replace(REGEX_VARIABLE, match => {
				return variables[match.substr(1)] || match;
			});
		}
	}

	return variables;
}

export default (datasets, fileNames) => {
	const dataset = combine(datasets, fileNames);
	const variables = flatten(dataset);

	return normalize(variables);
};
