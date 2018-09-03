import Autoprefixer from "autoprefixer";
import fixFlexbox from "postcss-flexbugs-fixes";
import CSSfilters from "pleeease-filters";
import ColorFunction from "postcss-color-function";
import ColorHexAlpha from "postcss-color-hex-alpha";
import imageSet from "postcss-image-set-polyfill";
import selectorNotFix from "postcss-selector-not";
import Variables from "./Variables.js";

export const variables = Variables({
	unknown: function(node, name, result) {
		node.warn(result, `\n\nUnknown variable ${name}\n`);
	},
});

export default bundle => [
	// SCSS like variables: `color: $text_color`
	variables,
	// polyfill the image-set CSS function
	imageSet,
	// fix flexbox issues on older browsers
	fixFlexbox,
	// convert `not(:first-child, .special)`
	// to `:not(:first-child):not(.special)`
	selectorNotFix,
	// Convert CSS shorthand filters to SVG equivalent for old browsers
	CSSfilters(),
	// transform CSS color function to more compatible CSS
	ColorFunction(),
	ColorHexAlpha(),
	// add vendor prefixes to rules
	Autoprefixer({
		browsers: bundle.config.browserslist,
		// fix flexbox and grid issues on IE11
		flexbox: "no-2009",
		grid: true,
	}),
];
