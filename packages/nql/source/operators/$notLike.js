import { isObject } from "@nore/std/assert";
import { quote } from "../utils";

export default function $notLike({ where, column, joiner, query, parse }) {
	if (isObject(where)) {
		const conditions = [];
		const values = [];

		for (const column in where) {
			conditions.push(`${quote(column)} NOT LIKE ?`);
			values.push(where[column]);
		}

		return [conditions.join(joiner), values];
	}

	return [`${quote(column)} NOT LIKE ?`, [where]];
}
