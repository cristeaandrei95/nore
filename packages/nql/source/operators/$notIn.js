import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase, quote } from "../utils";

export default function $notIn({ where, column, joiner, query, parse, build }) {
	// array
	if (isArray(where)) {
		const values = where.filter(Boolean);
		const special = where.filter(isNullOrBoolean);
		const conditions = [];

		if (values.length) {
			conditions.push(
				`${quote(column)} NOT IN (${values.map(i => "?").join(", ")})`
			);
		}

		if (special.length) {
			conditions.push(
				...special.map(v => `${quote(column)} IS NOT ${toUpperCase(v)}`)
			);
		}

		return [conditions.join(" OR "), values];
	}

	// sub-query
	if (isObject(where)) {
		const [sql, values] = build(where);

		return [`${quote(column)} NOT IN (${sql})`, values];
	}
}
