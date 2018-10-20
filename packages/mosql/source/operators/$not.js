import { isArray, isObject } from "@nore/std/assert";
import $is from "./$is.js";

function invert(value) {
	return value.replace(/ == /g, " != ").replace(/ IS /g, " IS NOT ");
}

function invertResult(result) {
	return isArray(result) ? [invert(result[0]), result[1]] : invert(result);
}

export default function $not(args) {
	if (isArray(args.where)) {
		return invertResult($is({ ...args, joiner: " OR " }));
	}

	if (isObject(args.where)) {
		return invertResult(args.parse(args));
	}

	return invertResult($is(args));
}
