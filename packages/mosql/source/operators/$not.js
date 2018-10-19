import { isArray, isObject } from "@nore/std/assert";
import $is from "./$is.js";

function invert(value) {
	return value.replace(/ == /g, " != ").replace(/ IS /g, " IS NOT ");
}

function isParsable(where) {
	return !isArray(where) && isObject(where);
}

export default function $not(args) {
	const result = isParsable(args.where) ? args.parse(args) : $is(args);

	if (isArray(result)) {
		result[0] = invert(result[0]);

		return result;
	}

	return invert(result);
}
