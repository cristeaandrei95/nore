import parse from "./parse.js";
import sortNodes from "./sortNodes.js";

export default function addPath(path, data, target) {
	const segments = parse(path);

	// set each segment on its branch
	branching: for (let n = 0, branch = target; n < segments.length; ++n) {
		const isLastSegment = n === segments.length - 1;
		const node = segments[n];

		// add children for branching
		node.children = [];
		node.literal = node.literal && node.literal.toLowerCase();

		// check if segment is already defined
		for (let i = 0; i < branch.children.length; ++i) {
			const child = branch.children[i];

			if (child.segment === node.segment) {
				if (isLastSegment) {
					if (child.data) {
						throw new Error(`Path conflict: ${path} segment: ${node.segment}`);
					}

					child.data = data;
					break;
				}

				branch = child;
				continue branching;
			}
		}

		// if segment is optional add the
		// data on the parent also
		if (node.isOptional && isLastSegment) {
			if (branch.data != null) {
				throw new Error(`Path conflict: ${path} segment: ${node.segment}`);
			}

			branch.data = data;
		}

		// add data on last segment
		if (isLastSegment) {
			node.data = data;
		}

		// add node to branch
		branch.children.push(node);

		// sort child nodes for match type priority
		branch.children.sort(sortNodes);

		// the child becomes the parent for the next segment
		branch = node;
	}
}
