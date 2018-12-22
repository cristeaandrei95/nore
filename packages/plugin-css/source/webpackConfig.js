import { merge } from "@nore/std";
import CSSExtract from "extract-css-chunks-webpack-plugin";
import OptimizeCSSAssets from "optimize-css-assets-webpack-plugin";
import getLocalIdent from "./getLocalIdent.js";
import getPostCSSOptions from "./postcss";

async function getLoaders({ bundle, useModules }) {
	const classesHelperLoader = `${__dirname}/classesLoader.js`;

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

	if (useModules) {
		if (bundle.isForNode) {
			return [classesHelperLoader, cssLoader, postcssLoader];
		}

		return [classesHelperLoader, CSSExtract.loader, cssLoader, postcssLoader];
	}

	return [cssLoader, postcssLoader];
}

export default async bundle => {
	const plugins = [];

	if (bundle.isForWeb) {
		plugins.push(
			new CSSExtract({
				cssModules: true,
				hot: bundle.isDevelopment,
				reloadAll: bundle.isDevelopment,
				orderWarning: bundle.isDevelopment,
				filename: "[name].css",
				chunkFilename: "[id].css",
			})
		);
		if (bundle.isDevelopment) {
			plugins.push(
				new OptimizeCSSAssets({
					cssProcessorOptions: {
						map: { inline: false, annotation: true },
						safe: true,
						discardComments: true,
					},
				})
			);
		}
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
			mainFields: ["style"],
			mainFiles: ["style"],
			extensions: [".css"],
		},
	};
};
