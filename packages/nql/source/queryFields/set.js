import { quote } from "../utils";

export default (data, query, build) => {
	const updates = [];
	const values = [];

	for (const key in data) {
		const isNull = data[key] === null;
		const sql = quote(key) + " = " + (isNull ? "NULL" : "?");

		updates.push(sql);

		if (!isNull) values.push(data[key]);
	}

	return [`SET ${updates.join(", ")}`, values];
};
