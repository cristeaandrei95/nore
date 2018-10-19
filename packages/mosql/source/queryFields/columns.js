import { isArray } from "@nore/std/assert";

export default (data, query, build) => {
	return isArray(data) ? data.join(", ") : data;
};
