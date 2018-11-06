import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase, quote } from "../helpers.js";

export default function $is({ where, column, joiner, query, parse, build }) {
	// sub-query
	if (isObject(where)) {
		return parse({ where, column, joiner, query, parse, build });
	}

	// null or boolean
	if (isNullOrBoolean(where)) {
		return `${quote(column)} IS ${toUpperCase(where)}`;
	}

	// string
	return [`${quote(column)} == ?`, [where]];
}
