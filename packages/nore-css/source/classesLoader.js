import util from "loader-utils";

// automatically bind CSS modules to classes utility
export function pitch(request) {
	this.cacheable();

	const cssImport = util.stringifyRequest(this, "!!" + request);

	return `
		import classes from "${__dirname}/classes.js"
		import css from ${cssImport}

		function filter (a, b, c, d, e) {
			return classes(css, a, b, c, d, e)
		}

		for (var key in css) {
			filter[key] = css[key]
		}

		export default filter
	`;
}
