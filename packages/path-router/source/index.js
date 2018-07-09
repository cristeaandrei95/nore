import addPath from "./addPath.js";
import matchPath from "./matchPath.js";

export { addPath, matchPath };

export default class Router {
	constructor(options = {}) {
		const { routes } = options;

		this.root = {
			segment: "/",
			children: [],
			data: null
		};

		if (routes) {
			for (const { path, data } of routes) {
				this.set(path, data);
			}
		}
	}

	set(path, data) {
		if (path === "/") {
			if (this.root.data) {
				throw new Error(`Route "/" already set.`);
			}

			this.root.data = data;
		} else {
			addPath(path, data, this.root);
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
				unmatched: null
			};
		} else {
			const match = matchPath(path, this.root);

			return {
				params: match.params,
				unmatched: match.unmatched,
				data: match.node ? match.node.data : null
			};
		}
	}
}
