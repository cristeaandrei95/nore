import { isArray } from "@nore/std/assert";

export default function $sql({ cell }) {
	if (isArray(cell)) {
		return { sql: cell[0], values: cell.slice(1) };
	}

	return cell;
}
