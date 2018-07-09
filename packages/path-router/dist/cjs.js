"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

// Remove the first and last slash
function trimSlashes(path) {
	const from = path[0] === "/" ? 1 : undefined;
	const to = path[path.length - 1] === "/" ? -1 : undefined;

	return path.slice(from, to);
}

const characters = "[\\w\\!\\$&'\\(\\)\\*\\+\\,;\\=\\:@\\-\\.~]";
const encoded = "%[A-F0-9]{2}";

const wildcard = "(\\*)";
const optional = "(\\?)?";
const key = "(\\w+)";

// {key} {key?} {key*}, {key*2}
const param = `\\{${key}(?:${wildcard})?${optional}\\}`;
const literal = `(?:${characters}|${encoded})+`;
const segment = `(${literal})|(?:${param})`;

const regex = new RegExp(segment, "g");

var parse = path => {
	const segments = [];

	trimSlashes(path).replace(regex, setSegment);

	function setSegment(segment, literal, key, wildcard, optional) {
		segments.push({
			segment,
			literal,
			key,
			isOptional: Boolean(optional),
			isWildcard: Boolean(wildcard),
		});
	}

	return segments;
};

/*
  Sort nodes in array to prioritize matching:

  1. literal
  2. {key}  - param
  3. {key*} - wildcard
  4. {key?} - optional
*/
var sortNodes = (A, B) => {
	const AFirst = -1;
	const BFirst = 1;

	// one is a literal, or both
	if (!A.key || !B.key) {
		return !A.key ? AFirst : BFirst;
	}

	// both wildcards? can't do
	if (A.wildcard && B.wildcard) {
		throw new Error(`Route conflict wildcards: ${A.segment} ${B.segment}`);
	}

	// one is a wildcard
	if (A.wildcard || B.wildcard) {
		return A.wildcard ? BFirst : AFirst;
	}
};

function addPath(route, target) {
	const { path, data } = route;
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

function matchPath(path, root) {
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

			// TODO: {key?} - match optional segment
		}

		// if no node is matched, store the rest of the segments
		unmatched = segments.slice(n, segments.length).join("/");

		break;
	}

	// mark null if no node is matched
	const match = branch === root ? null : branch;

	return { params, unmatched, node: match };
}

class Router {
	constructor({ routes }) {
		this.root = {
			segment: "/",
			children: [],
			data: null,
		};

		if (routes) {
			for (const route of routes) {
				this.set(route);
			}
		}
	}

	set(route) {
		if (route.path === "/") {
			if (this.root.data) {
				throw new Error(`Route "/" already set.`);
			}

			this.root.data = route.data;
		} else {
			addPath(route, this.root);
		}
	}

	get(path) {
		if (path === "/") return this.root;

		const { node } = matchPath(path, this.root);

		return this.root === node ? null : node;
	}

	match(path) {
		if (path === "/") {
			return {
				params: {},
				data: this.root.data,
				unmatched: undefined,
			};
		} else {
			const match = matchPath(path, this.root);

			return {
				params: match.params,
				unmatched: match.unmatched,
				data: match.node.data,
			};
		}
	}
}

exports.addPath = addPath;
exports.matchPath = matchPath;
exports.default = Router;

exports.Router = Router;
//# sourceMappingURL=cjs.js.map
