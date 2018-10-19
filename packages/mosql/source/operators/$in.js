import { isArray } from "@nore/std/assert";
import { isNullOrBoolean } from "../helpers.js";

function getNullOrBoolean(nullOrBoolean, column) {
	const conditions = nullOrBoolean.map(
		value => column + " IS " + String(value).toUpperCase()
	);

	return conditions.join(" AND ");
}

export default function $in({ where, context, joiner, query, parse, build }) {
	if (isArray(cell)) {
		const conditions = [];
		const nullOrBoolean = cell.filter(isNullOrBoolean);
		const values = cell.filter(Boolean);

		if (values.length) {
			conditions.push(`${column} IN (${values.join(", ")})`);
		}

		if (nullOrBoolean.length) {
			conditions.push(getNullOrBoolean(nullOrBoolean, column));
		}

		return conditions.join(" AND ");
	}

	// allow a sub-query request
	const result = build(cell);

	return {
		values: result.values,
		sql: `${column} IN (${result.sql})`,
	};
}
