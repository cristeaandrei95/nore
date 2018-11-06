import { keys } from "@nore/std/object";
import { quote, toQMarks } from "../utils";

export default (data, query, build) => {
	const columns = keys(data).map(quote);
	const values = keys(data).map(e => data[e]);
	const placeholders = toQMarks(columns);

	return [`(${columns.join(", ")}) VALUES (${placeholders})`, values];
};
