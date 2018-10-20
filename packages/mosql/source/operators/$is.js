import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean, toUpperCase } from "../helpers.js";

export default function $is({ where, context, joiner, query, parse, build }) {
	// array
	if (isArray(where)) {
		const values = where.filter(Boolean);
		const special = where.filter(isNullOrBoolean);
		const conditions = [];

		if (values.length) {
			conditions.push(...values.map(v => `${context} == ?`));
		}

		if (special.length) {
			conditions.push(...special.map(v => `${context} IS ${toUpperCase(v)}`));
		}

		return [conditions.join(joiner), values];
	}

	// sub-query
	if (isObject(where)) {
		return parse({ where, context, joiner, query, parse, build });
	}

	// null or boolean
	if (isNullOrBoolean(where)) {
		return `${context} IS ${toUpperCase(where)}`;
	}

	// string
	return [`${context} == ?`, [where]];
}
