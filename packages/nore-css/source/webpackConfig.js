import { merge } from "@nore/std";
import CSSExtract from "mini-css-extract-plugin";
import OptimizeCSS from "optimize-css-assets-webpack-plugin";
import postcss from "./postcss.js";
import getLocalIdent from "./getLocalIdent.js";

export default bundle => {
	const { isDevelopment, isForWeb } = bundle;
	const plugins = [];

	function getLoaders(useCSSModules) {
		const loaders = [`${__dirname}/classesLoader.js`];

		if (isForWeb) {
			loaders.push(isDevelopment ? "style-loader" : CSSExtract.loader);
		}

		loaders.push({
			loader: "css-loader",
			options: {
				importLoaders: 1,
				camelCase: "dashesOnly",
				sourceMap: isDevelopment,
				minimize: !isDevelopment,
				modules: useCSSModules,
				getLocalIdent: useCSSModules && getLocalIdent,
			},
		});

		loaders.push({
			loader: "postcss-loader",
			options: {
				ident: "postcss",
				plugins: postcss(bundle),
				sourceMap: isDevelopment,
			},
		});

		return loaders;
	}

	if (isForWeb && !isDevelopment) {
		plugins.push(
			new CSSExtract({
				filename: "[name].[contenthash].css",
				chunkFilename: "[name].[contenthash].css",
			}),
			new OptimizeCSS({
				cssProcessorOptions: {
					discardComments: { removeAll: true },
				},
			})
		);
	}

	const oneOf = [
		{ use: getLoaders(false), resourceQuery: /raw/ },
		{ use: getLoaders(true) },
	];

	return {
		plugins,
		module: {
			rules: [{ test: /\.css$/, oneOf }],
		},
		resolve: {
			extensions: [".css"],
		},
	};
};
