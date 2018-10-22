import { isArray } from "@nore/std/assert";
import { quote } from "../helpers.js";

export default (data, query, build) => {
	// array
	if (isArray(data)) {
		const columns = data.map(quote).join(", ");

		return columns && `GROUP BY ${columns}`;
	}

	// string
	return data && `GROUP BY ${quote(data)}`;
};
