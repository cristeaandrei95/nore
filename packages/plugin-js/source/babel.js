import { insertAt } from "@nore/std/array";
import { assign } from "@nore/std/object";
import setExternalBabelConfig from "./setExternalBabelConfig.js";

export default async bundle => {
	const javascript = [
		// transforms JS class properties
		// enable loose mode to use assignment instead of defineProperty
		["@babel/plugin-proposal-class-properties", { loose: true }],

		// transform ES6 destructuring to ES5
		"@babel/plugin-transform-destructuring",

		// transform ES6 object rest and spread to ES5
		// useBuiltIns will use Object.assign instead of babel's extend helper
		["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }],

		// add syntax support for dynamic `import()`
		"@babel/plugin-syntax-dynamic-import",
	];

	const features = [
		// compile time code replacement
		[
			"transform-define",
			// TODO: add way to extend this:
			{
				IN_NODE: bundle.isForNode,
				IN_BROWSER: bundle.isForWeb,
				IS_DEVELOPMENT: bundle.isDevelopment,
			},
		],

		// use compile-time code transformation
		// without adding them to babel plugins
		"babel-plugin-macros",

		// code splitting via the dynamic import syntax
		"@loadable/babel-plugin",
	];

	// like: @babel/preset-react
	const react = [
		// Transforms JSX class attributes into className
		"react-html-attrs",

		// transforms `render(props, state, context)` to react format
		"transform-react-render-parameters",

		// hoist JSX elements to the highest scope to reduce garbage collection
		"@babel/plugin-transform-react-constant-elements",

		// Turn JSX into JS function calls
		[
			"@babel/plugin-transform-react-jsx",
			assign(
				{
					pragma: "React.createElement",
					pragmaFrag: "React.Fragment",
					useBuiltIns: true,
				},
				bundle.config.jsx
			),
		],
	];

	if (bundle.isForWeb) {
		// adds transform async/await to promise chains
		javascript.push("transform-async-to-promises");

		if (bundle.isDevelopment) {
			insertAt(react, 1, [
				// adds source file and line number to JSX elements
				"@babel/plugin-transform-react-jsx-source",

				// adds __self prop to JSX elements, which
				// React will use to generate runtime warnings
				"@babel/plugin-transform-react-jsx-self",
			]);

			features.push(
				// adds `console.scope()` to log a function's entire scope
				"babel-plugin-console"
			);
		}
	}

	if (bundle.isForNode) {
		// transpile `import("./module")` to a deferred `require("./module")`
		features.push("dynamic-import-node");
	}

	// compiles ES2015+ down to ES5 by automatically determining the
	// Babel plugins and polyfills you need based on your targeted browser
	const babelPresetEnv = [
		"@babel/preset-env",
		{
			loose: true,
			debug: bundle.isDebug,
			shippedProposals: true,
			modules: bundle.isForNode ? "commonjs" : false,
			useBuiltIns: bundle.isForWeb ? "entry" : false,
			targets: bundle.isForWeb
				? { browsers: bundle.config.browserslist }
				: { node: bundle.isDevelopment ? "current" : 8.0 },
		},
	];

	const plugins = [...javascript, ...react, ...features];
	const presets = [babelPresetEnv];

	const config = {
		plugins,
		presets,
		babelrc: false,
		configFile: false,
		cacheDirectory: bundle.isDevelopment,
	};

	// try to load external babel file and extend config
	await setExternalBabelConfig(bundle, config);

	return config;
};
