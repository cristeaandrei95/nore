import autoprefixer from "autoprefixer";
import nested from "postcss-nested";
import fixFlexbox from "postcss-flexbugs-fixes";
import colorFunction from "postcss-color-function";
import colorHexAlpha from "postcss-color-hex-alpha";
import customSelectors from "postcss-custom-selectors";
import customMedia from "postcss-custom-media";
import selectorNotFix from "postcss-selector-not";
import imageSetFunction from "postcss-image-set-function";
import pleasefilters from "pleeease-filters";
import sassVariables from "./sassVariables.js";
import setExternalPostcssConfig from "./setExternalPostcssConfig.js";

export const variables = sassVariables({
	unknown: function(node, name, result) {
		node.warn(result, `\n\nUnknown variable ${name}\n`);
	},
});

export default async bundle => {
	const plugins = [
		// SCSS like variables: `color: $text_color`
		variables,

		// use Custom Selectors in CSS
		// ex: `@custom-selector :--heading h1, h2, h3;`
		customSelectors,

		// use Custom Media Queries in CSS
		// ex: `@custom-media --small-viewport (max-width: 30em)`
		customMedia,

		// unwrap nested rules like how Sass does it
		nested({
			// bubble only some at-rules
			bubble: ["media"],
		}),

		// image-set() helper function (https://git.io/fxfwu)
		imageSetFunction(),

		// fix flexbox issues on older browsers
		fixFlexbox,

		// convert `not(:first-child, .special)`
		// to `:not(:first-child):not(.special)`
		selectorNotFix,

		// Convert CSS shorthand filters to SVG equivalent for old browsers
		pleasefilters(),

		// transform CSS color function to more compatible CSS
		colorFunction(),
		colorHexAlpha(),

		// add vendor prefixes to rules
		autoprefixer({
			browsers: bundle.config.browserslist,
			// fix flexbox and grid issues on IE11
			flexbox: "no-2009",
			grid: true,
		}),
	];

	const config = {
		plugins,
		ident: "postcss",
		sourceMap: bundle.isDevelopment,
	};

	// try to load external postcss file and extend config
	await setExternalPostcssConfig(bundle, config);

	return config;
};
