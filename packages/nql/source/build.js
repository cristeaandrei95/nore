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
			// ignore field if no data was passed
			if (typeof query[field] === "undefined") continue;

			const handler = queryFields.get(field);
			const result = handler(query[field], query, build);

			if (isArray(result)) {
				blocks.push(result[0]);
				values.push.apply(values, result[1]);
			} else {
				blocks.push(result);
			}
		}
		// ignore field if no query field handler was implemented
		else {
			blocks.push(field);
		}
	}

	return [blocks.join(" "), values];
}
