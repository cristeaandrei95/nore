import Autoprefixer from "autoprefixer";
import fixFlexbox from "postcss-flexbugs-fixes";
import CSSfilters from "pleeease-filters";
import ColorFunction from "postcss-color-function";
import ColorHexAlpha from "postcss-color-hex-alpha";
import CustomProperties from "postcss-custom-properties";
import imageSet from "postcss-image-set-polyfill";
import selectorNotFix from "postcss-selector-not";

// use CSS Custom Properties
// ex: --my-primary-color: #000
export const cssVariables = CustomProperties({
	variables: {},
	warnings: true,
	appendVariables: true,
});

export default ({ config, variables }) => {
	cssVariables.setVariables(variables);

	return [
		cssVariables,
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
			browsers: config.browserslist,
			flexbox: "no-2009",
		}),
	];
};
