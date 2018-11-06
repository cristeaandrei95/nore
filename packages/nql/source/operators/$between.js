import { isObject, isArray } from "@nore/std/assert";
import { quote } from "../helpers.js";

export default function $between({ where, column, joiner, query, parse }) {
	if (isArray(where)) {
		return where.length && [`${quote(column)} BETWEEN ? AND ?`, where];
	}

	if (isObject(where)) {
		const conditions = [];
		const values = [];

		for (const column in where) {
			conditions.push(`${quote(column)} BETWEEN ? AND ?`);
			values.push.apply(values, where[column]);
		}

		return [conditions.join(joiner), values];
	}
}
