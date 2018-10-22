import { isString, isNumber } from "@nore/std/assert";

export default (value, query, build) => {
	const count = isString(value) ? parseInt(value, 10) : value;

	if (!isNumber(count)) return "";

	return { sql: `LIMIT ?`, values: [count] };
};
