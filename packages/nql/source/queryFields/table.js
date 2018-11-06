import { isArray, isObject } from "@nore/std/assert";

export default (data, query, build) => {
	if (isArray(data)) {
		return { sql: `FROM ? ?`, values: data };
	}

	if (isObject(data)) {
		return { sql: `FROM ? ?`, values: [data.name, data.alias] };
	}

	return `FROM "${data}"`;
};
