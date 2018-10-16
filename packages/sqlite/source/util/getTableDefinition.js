import { isString } from "@nore/std/assert";

export default definitions => {
	const result = {};

	for (const column in definitions) {
		let definition = definitions[column];

		if (isString(definition)) {
			definition = { type: definition };
		}

		if (definition.type === "timestamp") {
			definition = {
				type: "INTEGER",
				default: "(cast(strftime('%s','now') as int))",
			};
		}

		result[column] = definition;
	}

	return result;
};
