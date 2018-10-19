import { isArray, isObject } from "@nore/std/assert";
import { isNullOrBoolean } from "../helpers.js";

function getNullOrBooleanCondition(column, value) {
	return `${column} IS ${String(value).toUpperCase()}`;
}

function getCondition(column, value) {
	return isNullOrBoolean(value)
		? getNullOrBooleanCondition(column, value)
		: `${column} == ?`;
}

export default function $is({ where, context, joiner, query, parse, build }) {
	// null or boolean
	if (isNullOrBoolean(where)) {
		return getNullOrBooleanCondition(context, where);
	}

	// array
	if (isArray(where)) {
		const values = where.filter(Boolean);
		const sql = where.map(value => getCondition(context, value)).join(joiner);

		return [sql, values];
	}

	// sub-query
	if (isObject(where)) {
		return parse({ where, context, joiner, query, parse, build });
	}

	// string
	return [getCondition(context, where), [where]];
}
