import { keys } from "@nore/std/object";
import { isArray } from "@nore/std/assert";
import { quote, toQMarks } from "../utils";

function format(entry) {
	const params = [];
	const values = [];

	for (const key in entry) {
		const value = entry[key];

		if (value === null) {
			params.push("NULL");
		} else {
			params.push("?");
			values.push(value);
		}
	}

	return [`(${params.join(", ")})`, values];
}

export default (data, query, build) => {
	data = isArray(data) ? data : [data];

	const columns = keys(data[0]).map(quote);
	const params = [];
	const values = [];

	for (const entry of data) {
		const result = format(entry);

		params.push(result[0]);
		values.push.apply(values, result[1]);
	}

	return [`(${columns.join(", ")}) VALUES ${params.join(", ")}`, values];
};
