import { isArray, isObject } from "@nore/std/assert";
import { quote } from "../utils";

export default (data, query, build) => {
	if (isObject(data)) {
		return `${quote(data.name)} AS ${quote(data.as)}`;
	}

	return quote(data);
};
