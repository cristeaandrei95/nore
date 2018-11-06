import { flatten, isArray } from "@nore/std/array";

export default function $and(args) {
	const joiner = " AND ";

	if (isArray(args.where)) {
		const result = args.where
			.map(where => args.parse({ ...args, where, joiner }))
			// normalize results: [sql, values]
			.map(result => (isArray(result) ? result : [result, []]));

		return [
			result.map(entry => entry[0]).join(joiner),
			flatten(result.map(entry => entry[1])),
		];
	}

	return args.parse({ ...args, joiner });
}
