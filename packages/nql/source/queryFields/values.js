import { keys } from "@nore/std/object";
import { quote, toQMarks } from "../utils";

export default (data, query, build) => {
	const columns = keys(data).map(quote);
	const params = [];
	const values = [];

	for (const key in data) {
		const value = data[key];

		if (value === null) {
			params.push("NULL");
		} else {
			params.push("?");
			values.push(value);
		}
	}

	return [`(${columns.join(", ")}) VALUES (${params.join(", ")})`, values];
};
