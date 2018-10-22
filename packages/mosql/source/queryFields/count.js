import { isArray } from "@nore/std/assert";
import { quote, toParams } from "../helpers.js";

export default (data, query, build) => {
	// array
	if (isArray(data)) {
		if (!data.length) return "";

		return { sql: `COUNT(${toParams(data)})`, values: data };
	}

	// string
	if (data === "*") {
		return `COUNT(*)`;
	}

	return !data ? "" : { sql: `COUNT(?)`, values: [data] };
};
