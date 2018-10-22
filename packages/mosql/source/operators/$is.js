import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase, quote } from "../helpers.js";

export default function $is({ where, column, joiner, query, parse, build }) {
	// array
	if (isArray(where)) {
		const values = where.filter(Boolean);
		const special = where.filter(isNullOrBoolean);
		const conditions = [];

		if (values.length) {
			conditions.push(...values.map(v => `${quote(column)} == ?`));
		}

		if (special.length) {
			conditions.push(
				...special.map(v => `${quote(column)} IS ${toUpperCase(v)}`)
			);
		}

		return [conditions.join(joiner), values];
	}

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
