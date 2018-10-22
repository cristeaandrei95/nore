import { isArray } from "@nore/std/assert";

function format(value) {
	if (value && value.alias) {
		return `"${value.name}" as "${value.alias}"`;
	}

	if (value.includes("(")) {
		return value;
	}

	return `"${value}"`;
}

function toMark() {
	return "?";
}

export default (value, query, build) => {
	// array
	if (isArray(value)) {
		return value.map(format).join(", ");
	}

	// object
	if (isArray(value.values)) {
		return {
			sql: value.values.map(toMark).join(", "),
			values: value.values,
		};
	}

	// string
	return value === "*" ? value : format(value);
};
