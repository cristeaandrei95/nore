import { isObject } from "@nore/std/assert";

export default function $between({ where, column, joiner, query, parse }) {
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
