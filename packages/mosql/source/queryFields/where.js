import { isObject, isArray, isString, isNumber } from "@nore/std/assert";
import { keys } from "@nore/std/object";
import { isNullOrBoolean } from "../helpers.js";
import operators from "../operators";

function parse(args) {
	const conditions = [];
	const values = [];

	for (const field in args.where) {
		const operator = operators.get(field) || operators.get("$is");
		const options = { ...args, where: args.where[field] };

		// if no operator, we treat it like a column name
		if (!operators.has(field)) {
			options.column = field;
		}

		const result = operator(options);

		if (isArray(result)) {
			conditions.push(result[0]);
			values.push.apply(values, result[1] || []);
		} else {
			conditions.push(result);
		}
	}

	return [conditions.join(args.joiner), values];
}

export default (value, query, build) => {
	const options = {
		// build and parse functions will be passed to operators
		build,
		parse,
		// original query passed to build
		query,
		// the conditionals object
		where: value,
		// the property name of the parent object, if any
		column: null,
		// the logical operator used to join conditions
		joiner: " AND ",
		isNot: false,
		toWrap: false,
	};

	const [sql, values] = parse(options);

	return { values, sql: sql && `WHERE ${sql}` };
};
