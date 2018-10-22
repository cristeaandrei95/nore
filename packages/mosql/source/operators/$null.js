import { isArray, isObject } from "@nore/std/assert";
import { quote } from "../helpers.js";

export default function $null({ where, column, joiner, query, parse, build }) {
	if (isArray(where)) {
		return where.map(column => `${quote(column)} IS NULL`).join(joiner);
	}

	return `${quote(column)} ${where === false ? "IS NOT" : "IS"} NULL`;
}
