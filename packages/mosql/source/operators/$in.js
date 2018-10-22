import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase } from "../helpers.js";

export default function $in({ where, column, joiner, query, parse, build }) {
	// array
	if (isArray(where)) {
		const values = where.filter(Boolean);
		const special = where.filter(isNullOrBoolean);
		const conditions = [];

		if (values.length) {
			conditions.push(`${column} IN (${values.map(i => "?").join(", ")})`);
		}

		if (special.length) {
			conditions.push(...special.map(v => `${column} IS ${toUpperCase(v)}`));
		}

		return [conditions.join(" OR "), values];
	}

	// sub-query
	if (isObject(where)) {
		const { sql, values } = build(where);

		return [`${column} IN (${sql})`, values];
	}
}
