import { insertAt } from "@nore/std/array";
import { assign } from "@nore/std/object";

export default bundle => {
	const { isForWeb, isForNode, isDevelopment, config } = bundle;
	/*
		TODO: add transform async/await to Promise
		"transform-async-to-promises" it after the v7 update
		or use https://github.com/MatAtBread/nodent-compiler?
	*/

	const javascript = [
		// transforms JS class properties
		"@babel/plugin-proposal-class-properties",
	];

	const features = [
		// compile time code replacement
		[
			"transform-define",
			// TODO: add way to extend this:
			{
				IN_NODE: isForNode,
				IN_BROWSER: isForWeb,
			},
		],
		// use compile-time code transformation
		// without adding them to babel plugins
		"babel-plugin-macros",
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
			config.jsx || {
				pragma: "React.createElement",
				pragmaFrag: "React.Fragment",
			},
		],
		// add react loadable imports
		"loadable-components/babel",
	];

	if (isForWeb && isDevelopment) {
		insertAt(react, 1, [
			// Adds source file and line number to JSX elements
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

	const webTarget = {
		browsers: config.browserslist,
	};

	const nodeTarget = {
		node: isDevelopment ? "current" : 8.0,
	};

	const presetEnvOptions = {
		loose: true,
		shippedProposals: true,
		modules: "commonjs",
		debug: isDevelopment,
		useBuiltIns: isForWeb ? false : "entry",
		targets: isForWeb ? webTarget : nodeTarget,
	};

	return {
		babelrc: false,
		cacheDirectory: isDevelopment,
		plugins: [...javascript, ...react, ...features],
		presets: [
			// compiles ES2015+ down to ES5 by automatically determining the
			// Babel plugins and polyfills you need based on your targeted browser
			["@babel/preset-env", presetEnvOptions],
		],
	};
};
