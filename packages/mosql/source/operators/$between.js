import { isObject, isArray } from "@nore/std/assert";

export default function $between({ where, column, joiner, query, parse }) {
	if (isArray(where)) {
		return where.length && [`${column} BETWEEN ? AND ?`, where];
	}

	if (isObject(where)) {
		const conditions = [];
		const values = [];

		for (const key in where) {
			conditions.push(`${key} BETWEEN ? AND ?`);
			values.push.apply(values, where[key]);
		}

		return [conditions.join(joiner), values];
	}
}
