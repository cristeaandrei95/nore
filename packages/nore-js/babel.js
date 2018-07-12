import { insertAt } from "@nore/std/array";

export default bundle => {
	const presets = [];

	const constantsToReplace = {
		IN_NODE: bundle.isForNode,
		IN_BROWSER: bundle.isForWeb,
	};

	/*
		TODO: add transform async/await to Promise
		"transform-async-to-promises" it after the v7 update
		or use https://github.com/MatAtBread/nodent-compiler?

		TODO: the plugin below is buggy in beta.53
		hoist JSX elements to the highest scope to reduce garbage collection
		"@babel/plugin-transform-react-constant-elements",
	*/

	const javascript = [
		// allows parsing: `import('module')`
		"@babel/plugin-syntax-dynamic-import",
		// transforms JS class properties
		"@babel/plugin-proposal-class-properties",
		// transform rest properties for object destructuring assignment
		// and spread properties for object literals
		"@babel/plugin-proposal-object-rest-spread",
		// Compile ES2015 destructuring to ES5
		"@babel/plugin-transform-destructuring",
	];

	const features = [
		// compile time code replacement
		["transform-define", constantsToReplace],
		// use compile-time code transformation
		// without adding them to babel plugins
		"babel-plugin-macros",
	];

	// like: @babel/preset-react
	const react = [
		// allow parsing of JSX
		"@babel/plugin-syntax-jsx",
		// transforms `render(props, state, context)` to react format
		"transform-react-render-parameters",
		// Transforms JSX class attributes into className
		"react-html-attrs",
		// Turn JSX into JS function calls
		[
			"@babel/plugin-transform-react-jsx",
			{
				pragma: "React.createElement",
				pragmaFrag: "React.Fragment",
				useBuiltIns: true,
				throwIfNamespace: true,
			},
		],
		// add react loadable imports
		"loadable-components/babel",
	];

	if (bundle.isForWeb) {
		if (bundle.isDevelopment) {
			insertAt(react, 1, [
				// adds __self prop to JSX elements, which
				// React will use to generate runtime warnings
				"@babel/plugin-transform-react-jsx-self",
				// Adds source file and line number to JSX elements
				"@babel/plugin-transform-react-jsx-source",
			]);

			features.push(
				// adds `console.scope()` to log a function's entire scope
				"babel-plugin-console"
			);
		}

		if (!bundle.isDevelopment) {
			presets.push(
				// compiles ES2015+ down to ES5 by automatically determining the
				// Babel plugins and polyfills you need based on your targeted browser
				[
					"@babel/preset-env",
					{ targets: { browsers: bundle.config.browserslist } },
				]
			);
		}
	}

	return { presets, plugins: [...javascript, ...react, ...features] };
};
