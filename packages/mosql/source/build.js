import { isObject } from "@nore/std/assert";
import queryTypes from "./queryTypes";
import queryFields from "./queryFields";
import { normalizeQuery } from "./helpers.js";

export default function build(query = {}) {
	if (!queryTypes.has(query.type)) {
		throw Error(`Invalid query type: ${query.type}`);
	}

	query = normalizeQuery(query);

	const sections = queryTypes.get(query.type);
	const blocks = [];
	const values = [];

	sections.forEach((field, i) => {
		if (queryFields.has(field)) {
			const data = query[field];
			const handler = queryFields.get(field);
			const result = handler(data, query, build);

			if (result) {
				blocks.push(result.sql || result);

				if (result.values) {
					values.push.apply(values, result.values);
				}
			}
		}
		// ignore field if no query field handler was implemented
		else {
			blocks.push(field);
		}
	});

	return { values, sql: blocks.join(" ") };
}
