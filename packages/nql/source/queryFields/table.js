import { isArray, isObject } from "@nore/std/assert";

export default (data, query, build) => {
	const prefix = query.type === "insert" ? "INTO" : "FROM";

	if (isObject(data)) {
		return `${prefix} "${data.name}" AS "${data.as}"`;
	}

	return `${prefix} "${data}"`;
};
