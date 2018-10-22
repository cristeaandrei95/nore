import { isString, isNumber } from "@nore/std/assert";

export default (data, query, build) => {
	const count = isString(data) ? parseInt(data, 10) : data;

	if (!isNumber(count)) return "";

	return { sql: `LIMIT ?`, values: [count] };
};
