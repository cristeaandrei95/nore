import mosql from "mongo-sql";

const DOLLAR_DIGIT = /\$\d/gm;
const normalize = q => q.replace(DOLLAR_DIGIT, "?");

export function buildQuery(request) {
	const { query, values } = mosql.sql(request);
	const sql = normalize(query);

	return { sql, values };
}

export default mosql;
