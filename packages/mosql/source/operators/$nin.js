import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase } from "../helpers.js";

export default function $nin({ where, context, joiner, query, parse, build }) {
	// array
	if (isArray(where)) {
		const values = where.filter(Boolean);
		const special = where.filter(isNullOrBoolean);
		const conditions = [];

		if (values.length) {
			conditions.push(`${context} NOT IN (${values.map(i => "?").join(", ")})`);
		}

		if (special.length) {
			conditions.push(
				...special.map(v => `${context} IS NOT ${toUpperCase(v)}`)
			);
		}

		return [conditions.join(" OR "), values];
	}

	// sub-query
	if (isObject(where)) {
		const { sql, values } = build(where);

		return [`${context} NOT IN (${sql})`, values];
	}
}
