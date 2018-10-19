import { isArray, isObject } from "@nore/std/assert";

export default function $null({ where, context, joiner, query, parse, build }) {
	if (isArray(where)) {
		return where.map(column => `${column} IS NULL`).join(joiner);
	}

	return `${context} ${where === false ? "IS NOT" : "IS"} NULL`;
}
