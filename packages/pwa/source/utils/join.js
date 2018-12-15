export default function join(...paths) {
	const segments = [];

	for (const path of paths) {
		segments.push(...path.split("/"));
	}

	const parts = [];

	for (const segment of segments) {
		// ignore empty segments and single dot
		if (!segment || segment === ".") continue;

		// remove previous segment on double dots (go up one level on path)
		if (segment === "..") {
			parts.pop();
		}

		parts.push(segment);
	}

	let path = parts.join("/");

	// Preserve the initial slash if there was one.
	if (segments[0] === "") {
		path = "/" + path;
	}

	return path;
}
