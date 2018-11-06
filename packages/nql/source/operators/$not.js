import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase, quote } from "../utils";
import $is from "./$is.js";

function invert(value) {
	return value.replace(/ == /g, " != ").replace(/ IS /g, " IS NOT ");
}

function invertResult(result) {
	return isArray(result) ? [invert(result[0]), result[1]] : invert(result);
}

export default function $not({ where, column, joiner, query, parse, build }) {
	// sub-query
	if (isObject(where)) {
		const result = $is({ where, column, joiner, query, parse, build });

		return result ? invertResult(result) : "";
	}

	// null or boolean
	if (isNullOrBoolean(where)) {
		return `${quote(column)} IS NOT ${toUpperCase(where)}`;
	}

	// string
	return [`${quote(column)} != ?`, [where]];
}
