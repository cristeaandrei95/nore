import { merge } from "@nore/std";
import CSSExtract from "extract-css-chunks-webpack-plugin";
import OptimizeCSS from "optimize-css-assets-webpack-plugin";
import getLocalIdent from "./getLocalIdent.js";
import getPostCSSOptions from "./postcss";

async function getLoaders({ bundle, useModules }) {
	const cssLoader = {
		loader: "css-loader",
		options: {
			importLoaders: 1,
			camelCase: "dashesOnly",
			sourceMap: bundle.isDevelopment,
			modules: useModules,
			getLocalIdent: useModules && getLocalIdent,
			exportOnlyLocals: bundle.isForNode,
		},
	};

	const postcssLoader = {
		loader: "postcss-loader",
		options: await getPostCSSOptions(bundle),
	};

	return [
		`${__dirname}/classesLoader.js`,
		CSSExtract.loader,
		cssLoader,
		postcssLoader,
	];
}

export default async bundle => {
	const { isDevelopment, isForWeb } = bundle;

	const plugins = [
		new CSSExtract({
			cssModules: true,
			orderWarning: bundle.isDevelopment,
			hot: bundle.isDevelopment,
			reloadAll: bundle.isDevelopment,
			filename: "[name].[contenthash].css",
			chunkFilename: "[name].[contenthash].css",
		}),
	];

	if (isForWeb && !isDevelopment) {
		plugins.push(
			new OptimizeCSS({
				cssProcessorOptions: {
					discardComments: { removeAll: true },
				},
			})
		);
	}

	// allow to load CSS Modules: `import style from "./style.css"`
	const cssModulesLoaders = await getLoaders({ bundle, useModules: true });

	// allow to load raw CSS: `import "./bootstrap.css?raw`
	const cssRawLoaders = await getLoaders({ bundle, useModules: false });

	const cssRule = {
		test: /\.css$/,
		oneOf: [
			{ use: cssRawLoaders, resourceQuery: /raw/ },
			{ use: cssModulesLoaders },
		],
	};

	return {
		plugins,
		module: { rules: [cssRule] },
		resolve: {
			extensions: [".css"],
		},
	};
};
