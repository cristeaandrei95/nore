import { isObject } from "@nore/std/assert";

export default function $notLike({ where, context, joiner, query, parse }) {
	if (isObject(where)) {
		const conditions = [];
		const values = [];

		for (const column in where) {
			conditions.push(`${column} LIKE ?`);
			values.push(where[column]);
		}

		return [conditions.join(joiner), values];
	}

	return [`${context} NOT LIKE ?`, [where]];
}
