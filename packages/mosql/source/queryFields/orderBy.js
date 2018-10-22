import { isObject, isArray } from "@nore/std/assert";
import { quote } from "../helpers.js";

export default (data, query, build) => {
	// array
	if (isArray(data)) {
		const columns = data.map(quote).join(", ");

		return columns && `ORDER BY ${columns}`;
	}

	// object
	if (isObject(data)) {
		if (!data.asc && !data.desc) return;

		const columns = (data.asc || data.desc).map(quote).join(", ");
		const order = data.desc ? "DESC" : "ASC";

		return columns && `ORDER BY ${columns} ${order}`;
	}

	// string
	return data && `ORDER BY ${quote(data)}`;
};
