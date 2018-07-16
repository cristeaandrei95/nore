import { merge } from "@nore/std";
import CSSExtract from "mini-css-extract-plugin";
import OptimizeCSS from "optimize-css-assets-webpack-plugin";
import formatClassName from "./formatClassName.js";
import postcss from "./postcss.js";

const getLoaders = ({ useCSSModules, bundle }) => {
	const loaders = [
		{
			loader: "css-loader",
			options: {
				importLoaders: 1,
				sourceMap: bundle.isDevelopment,
				minimize: !bundle.isDevelopment,
				modules: useCSSModules,
				getLocalIdent: useCSSModules && formatClassName(bundle.isDevelopment),
			},
		},
		{
			loader: "postcss-loader",
			options: {
				ident: "postcss",
				sourceMap: bundle.isDevelopment,
				plugins: postcss({
					config: bundle.config,
				}),
			},
		},
	];

	if (bundle.isForWeb) {
		loaders.unshift(bundle.isDevelopment ? "style-loader" : CSSExtract.loader);
	}

	return loaders;
};

export default bundle => {
	const plugins = [];

	if (bundle.isForWeb && !bundle.isDevelopment) {
		plugins.push(
			new CSSExtract({
				filename: "[name].[hash:8].css",
				chunkFilename: "[id].[hash:8].css",
			}),
			new OptimizeCSS({
				cssProcessorOptions: { discardComments: { removeAll: true } },
			})
		);
	}

	const rules = [
		{
			test: /\.css$/,
			oneOf: [
				{
					use: getLoaders({ useCSSModules: false, bundle }),
					resourceQuery: /raw/,
				},
				{ use: getLoaders({ useCSSModules: true, bundle }) },
			],
		},
	];

	return { plugins, module: { rules } };
};
