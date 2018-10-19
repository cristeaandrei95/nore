import { isArray } from "@nore/std/assert";

export default function $sql({ where, context, joiner, query, parse, build }) {
	if (isArray(where)) {
		return [where[0], where.slice(1)];
	}

	return where;
}
