import { isObject } from "@nore/std/assert";
import queryTypes from "./queryTypes";
import queryFields from "./queryFields";
import { normalizeQuery } from "./helpers.js";

export default function build(query = {}) {
	if (!queryTypes.has(query.type)) {
		throw Error(`Invalid query type: ${query.type}`);
	}

	query = normalizeQuery(query);

	const { template, fields, variables } = queryTypes.get(query.type);

	let sql = template;
	let values = [];

	fields.forEach((field, i) => {
		if (queryFields.has(field)) {
			const data = query[field];
			const handler = queryFields.get(field);
			const result = handler(data, query, build);

			if (isObject(result)) {
				sql = sql.replace(variables[i], result.sql || "");
				values = values.concat(result.values || []);
			} else {
				sql = sql.replace(variables[i], result || "");
			}
		}
		// ignore field if no query field handler was implemented
		else {
			sql = sql.replace(variables[i], "");
		}
	});

	return { values, sql: sql.trim() };
}
