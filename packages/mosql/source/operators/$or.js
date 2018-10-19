import { flatten } from "@nore/std/array";

export default function $or({ where, context, joiner, query, parse, build }) {
	if (isArray(where)) {
		const result = where
			.map(entry =>
				parse({ context, joiner, query, parse, build, where: entry })
			)
			// normalize results: [sql, values]
			.map(result => (isArray(result) ? result : [result, []]));

		return [
			result.map(entry => entry[0]).join(" OR "),
			flatten(result.map(entry => entry[1])),
		];
	}

	return parse({ where, context, query, parse, build, joiner: " OR " });
}
