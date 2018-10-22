import { isObject, isArray } from "@nore/std/assert";
import { quote } from "../helpers.js";

export default (value, query, build) => {
	// array
	if (isArray(value)) {
		const columns = value.map(quote).join(", ");

		return columns && `ORDER BY ${columns}`;
	}

	// object
	if (isObject(value)) {
		const columns = (value.asc || value.desc).map(quote).join(", ");
		const order = value.desc ? "DESC" : "ASC";

		return columns && `ORDER BY ${columns} ${order}`;
	}

	// string
	return value && `ORDER BY ${quote(value)}`;
};
