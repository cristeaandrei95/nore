import { isObject } from "@nore/std/assert";

export default function $gt({ where, column, joiner, query, parse, build }) {
	if (isObject(where)) {
		const conditions = [];
		const values = [];

		for (const column in where) {
			conditions.push(`${column} > ?`);
			values.push(where[column]);
		}

		return [conditions.join(joiner), values];
	}

	return [`${column} > ?`, [where]];
}
