import { isObject, isArray } from "@nore/std/assert";
import { quote } from "../utils";

export default (data, query, build) => {
	// array
	if (isArray(data)) {
		const columns = data.map(quote).join(", ");

		return columns && `ORDER BY ${columns}`;
	}

	// object
	if (isObject(data)) {
		const asc = [];
		const desc = [];
		const orderBy = [];

		for (const field in data) {
			const value = data[field];

			if (field === "$asc") {
				asc.push.apply(asc, value);
			} else if (field === "$desc") {
				desc.push.apply(desc, value);
			} else {
				(value === "desc" ? desc : asc).push(field);
			}
		}

		if (asc.length) {
			orderBy.push(`${asc.map(quote).join(", ")} ASC`);
		}

		if (desc.length) {
			orderBy.push(`${desc.map(quote).join(", ")} DESC`);
		}

		return orderBy.length ? `ORDER BY ${orderBy.join(", ")}` : "";
	}

	// string
	return data && `ORDER BY ${quote(data)}`;
};
