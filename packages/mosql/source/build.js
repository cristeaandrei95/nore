import { isObject } from "@nore/std/assert";
import queryTypes from "./queryTypes";
import queryFields from "./queryFields";
import { normalizeQuery } from "./helpers.js";

export default function build(query = {}) {
	if (!queryTypes.has(query.type)) {
		throw Error(`Invalid query type: ${query.type}`);
	}

	const blocks = [];
	const values = [];

	for (const field of queryTypes.get(query.type)) {
		if (queryFields.has(field)) {
			// ignore field if no data was passed
			if (typeof query[field] === "undefined") continue;

			const handler = queryFields.get(field);
			const result = handler(query[field], query, build);

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
	}

	return { values, sql: blocks.join(" ") };
}
