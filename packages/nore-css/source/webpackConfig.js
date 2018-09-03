import { merge } from "@nore/std";
import CSSExtract from "mini-css-extract-plugin";
import OptimizeCSS from "optimize-css-assets-webpack-plugin";
import postcss from "./postcss.js";

export default bundle => {
	const { isDevelopment, isForWeb } = bundle;
	const plugins = [];

	const localIdentName = isDevelopment
		? "[local]_[hash:base64:5]"
		: "c[hash:base64:5]";

	function getLoaders(useCSSModules) {
		const loaders = [`${__dirname}/classesLoader.js`];

		if (isForWeb) {
			loaders.push(isDevelopment ? "style-loader" : CSSExtract.loader);
		}

		loaders.push({
			loader: "css-loader",
			options: {
				importLoaders: 1,
				sourceMap: isDevelopment,
				minimize: !isDevelopment,
				modules: useCSSModules,
				localIdentName: useCSSModules && localIdentName,
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

		return loaders.concat([cssLoader, postcssLoader]);
	}

	const oneOf = [
		{ use: getLoaders(false), resourceQuery: /raw/ },
		{ use: getLoaders(true) },
	];

	if (isForWeb && !isDevelopment) {
		plugins.push(
			new CSSExtract({
				filename: "[name].[hash:8].css",
				chunkFilename: "[id].[hash:8].css",
			}),
			new OptimizeCSS({
				cssProcessorOptions: {
					discardComments: { removeAll: true },
				},
			})
		);
	}

	return {
		plugins,
		module: {
			rules: { test: /\.css$/, oneOf },
		},
		resolve: {
			extensions: [".css"],
		},
	};
};
