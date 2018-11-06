import { quote } from "../utils";

export default (data, query, build) => {
	const updates = [];
	const values = [];

	for (const key in data) {
		const value = data[key];
		const sql = quote(key) + " = " + (value === null ? "NULL" : "?");

		updates.push(sql);

		if (value !== null) values.push(value);
	}

	return [`SET ${updates.join(", ")}`, values];
};
