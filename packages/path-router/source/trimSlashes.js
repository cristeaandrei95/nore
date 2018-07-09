// Remove the first and last slash
export default function trimSlashes(path) {
	const from = path[0] === "/" ? 1 : undefined;
	const to = path[path.length - 1] === "/" ? -1 : undefined;

	return path.slice(from, to);
}
