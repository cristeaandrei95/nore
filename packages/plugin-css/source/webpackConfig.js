import { merge } from "@nore/std";
import CSSExtract from "mini-css-extract-plugin";
import OptimizeCSS from "optimize-css-assets-webpack-plugin";
import getLocalIdent from "./getLocalIdent.js";
import postcss from "./postcss";

function getLoaders({ bundle, useModules }) {
	const loaders = [`${__dirname}/classesLoader.js`];

	if (bundle.isForWeb) {
		loaders.push(bundle.isDevelopment ? "style-loader" : CSSExtract.loader);
	}

	loaders.push({
		loader: "css-loader",
		options: {
			importLoaders: 1,
			camelCase: "dashesOnly",
			sourceMap: bundle.isDevelopment,
			modules: useModules,
			getLocalIdent: useModules && getLocalIdent,
			exportOnlyLocals: bundle.isForNode,
		},
	});

	return loaders;
}

export default async bundle => {
	const { isDevelopment, isForWeb } = bundle;
	const plugins = [];

	// allow to load CSS Modules: `import style from "./style.css"`
	const cssModulesLoaders = getLoaders({ bundle, useModules: true });

	// allow to load raw CSS: `import "./bootstrap.css?raw`
	const cssRawLoaders = getLoaders({ bundle, useModules: false });

	const postcssLoader = {
		loader: "postcss-loader",
		options: await postcss(bundle),
	};

	const oneOf = [
		{ use: [...cssRawLoaders, postcssLoader], resourceQuery: /raw/ },
		{ use: [...cssModulesLoaders, postcssLoader] },
	];

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
