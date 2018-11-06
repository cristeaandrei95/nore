import { isArray } from "@nore/std/assert";
import { normalizeQuery } from "./utils";
import queryTypes from "./queryTypes";
import queryFields from "./queryFields";

export default function build(query = {}) {
	if (!queryTypes.has(query.type)) {
		throw Error(`Invalid query type: ${query.type}`);
	}

	const blocks = [];
	const values = [];

	for (const field of queryTypes.get(query.type)) {
		if (queryFields.has(field)) {
			// ignore field if invalid data is passed
			if (query[field] == null) continue;

			const handler = queryFields.get(field);
			const result = handler(query[field], query, build);

			if (isArray(result)) {
				blocks.push(result[0]);
				values.push.apply(values, result[1]);
			} else {
				blocks.push(result);
			}
		}
		// push field if handler was implemented
		else {
			blocks.push(field);
		}
	}

	return [blocks.join(" "), values];
}
