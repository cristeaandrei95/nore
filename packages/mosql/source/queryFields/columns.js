import { isArray } from "@nore/std/assert";

function aliasOrColumn(entry) {
	if (entry && entry.alias) {
		return `"${entry.name}" as "${entry.alias}"`;
	}

	return `"${entry}"`;
}

function toMark() {
	return "?";
}

export default (value, query, build) => {
	// array
	if (isArray(value)) {
		return value.map(aliasOrColumn).join(", ");
	}

	// object
	if (isArray(value.values)) {
		return {
			sql: value.values.map(toMark).join(", "),
			values: value.values,
		};
	}

	// string
	return value === "*" ? value : `"${value}"`;
};
