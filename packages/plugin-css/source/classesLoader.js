export default (content, map, meta) => `
	${content.replace("module.exports", "var css")}
	var classes = require("${__dirname}/classes.js");

	function filter (a, b, c, d, e, f, g, h, i, j) {
		return classes(css, a, b, c, d, e, f, g, h, i, j);
	}

	for (var key in css) {
		filter[key] = " " + css[key];
	}

	module.exports = filter;
`;
