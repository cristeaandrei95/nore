import trimSlashes from "./trimSlashes.js";

export default function matchPath(path, root) {
	const segments = trimSlashes(path).split("/");
	const last = segments.length - 1;
	const params = {};

	let unmatched = null;
	let branch = root;

	match: for (let n = 0; n < segments.length; ++n) {
		const segment = segments[n];

		for (let i = 0; i < branch.children.length; ++i) {
			const node = branch.children[i];

			// match literal
			if (!node.key && node.literal === segment.toLowerCase()) {
				branch = node;
				continue match;
			}

			// {key}
			if (node.key && !node.isWildcard) {
				params[node.key] = segment;
				branch = node;
				continue match;
			}

			// {key*}
			if (node.isWildcard) {
				params[node.key] = segments.splice(n, last);
				branch = node;
				break;
			}
		}

		// if no node is matched, store the rest of the segments
		unmatched = segments.slice(n, segments.length).join("/");

		break;
	}

	// mark null if no node is matched
	const match = branch === root ? null : branch;

	return { params, unmatched, node: match };
}
