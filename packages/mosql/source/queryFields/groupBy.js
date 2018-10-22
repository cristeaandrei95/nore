import { isArray } from "@nore/std/assert";
import { quote } from "../helpers.js";

export default (value, query, build) => {
	// array
	if (isArray(value)) {
		const columns = value.map(quote).join(", ");

		return columns && `GROUP BY ${columns}`;
	}

	// string
	return value && `GROUP BY ${quote(value)}`;
};
