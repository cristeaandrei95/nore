import { isObject } from "@nore/std/assert";
import { quote } from "../utils";

export default function $gte({ where, column, joiner, query, parse, build }) {
	if (isObject(where)) {
		const conditions = [];
		const values = [];

		for (const column in where) {
			conditions.push(`${quote(column)} >= ?`);
			values.push(where[column]);
		}

		return [conditions.join(joiner), values];
	}

	return [`${quote(column)} >= ?`, [where]];
}