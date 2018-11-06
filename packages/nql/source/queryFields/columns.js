import { isArray } from "@nore/std/assert";
import { toParams } from "../helpers.js";

function format(value) {
	if (value && value.alias) {
		return `"${value.name}" as "${value.alias}"`;
	}

	return `"${value}"`;
}

export default (data, query, build) => {
	// array
	if (isArray(data)) {
		return data.map(format).join(", ");
	}

	// object
	if (isArray(data.values)) {
		return {
			sql: toParams(data.values),
			values: data.values,
		};
	}

	// string
	return data === "*" ? data : format(data);
};
