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
			options.context = field;
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

export default (where, query, build) => {
	const options = {
		// build and parse functions will be passed to operators
		build,
		parse,
		// original query passed to build
		query,
		// the conditionals object
		where,
		// the property name of the parent object, if any
		context: null,
		// the logical operator used to join conditions
		joiner: " AND ",
	};

	const [sql, values] = parse(options);

	return { values, sql: sql && `WHERE ${sql}` };
};
