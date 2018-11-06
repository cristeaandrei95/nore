import { isArray, isObject } from "@nore/std/assert";
import { quote } from "../utils";

export default function $isNull({
	where,
	column,
	joiner,
	query,
	parse,
	build,
}) {
	if (isArray(where)) {
		return where.map(column => `${quote(column)} IS NULL`).join(joiner);
	}

	return `${quote(column)} ${where === false ? "IS NOT" : "IS"} NULL`;
}
