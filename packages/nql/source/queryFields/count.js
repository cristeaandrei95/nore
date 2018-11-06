import { isArray } from "@nore/std/assert";
import { quote } from "../utils";

export default (data, query, build) => {
	// array
	if (isArray(data)) {
		if (!data.length) return "";

		return `COUNT(${data.map(quote).join(", ")})`;
	}

	// string
	if (data === "*") {
		return `COUNT(*)`;
	}

	return !data ? "" : `COUNT(${quote(data)})`;
};
