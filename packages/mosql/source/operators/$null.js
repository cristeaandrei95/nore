import { isArray, isObject } from "@nore/std/assert";

export default function $null({ where, column, joiner, query, parse, build }) {
	if (isArray(where)) {
		return where.map(column => `${column} IS NULL`).join(joiner);
	}

	return `${column} ${where === false ? "IS NOT" : "IS"} NULL`;
}
