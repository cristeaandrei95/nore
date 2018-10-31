// import mosql from "mongo-sql";

const TO_MATCH = /\$\d+/gm;
const normalize = sql => sql.replace(TO_MATCH, "?");

export default query => {
	const result = mosql.sql(query);
	const sql = normalize(result.query);
	const values = result.values;

	return { sql, values };
};
