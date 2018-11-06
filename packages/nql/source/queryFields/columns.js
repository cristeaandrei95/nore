import { isArray } from "@nore/std/assert";

function format(value) {
	if (value && value.as) {
		return `"${value.name}" as "${value.as}"`;
	}

	return `"${value}"`;
}

export default (data, query, build) => {
	// array
	if (isArray(data)) {
		return data.map(format).join(", ");
	}

	// string
	return data === "*" ? data : format(data);
};
