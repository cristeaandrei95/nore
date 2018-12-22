import HTMLPlugin from "html-webpack-plugin";
import InlineWebpackRuntime from "./InlineWebpackRuntime.js";

export default async bundle => {
	const plugins = [
		new HTMLPlugin({
			config: bundle.config,
			source: bundle.sourcePath,
			isDevelopment: bundle.isDevelopment,
			template: `${__dirname}/template.js`,
			inject: false,
			minify: !bundle.isDevelopment && {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
	];

	if (bundle.isForWeb) {
		plugins.push(
			// webpack's runtime always change between every build it's
			// better to split the runtime code out for long-term caching
			new InlineWebpackRuntime("webpack_runtime")
		);
	}

	const htmlLoader = ({ useTemplate }) => ({
		loader: "html-loader",
		options: {
			minimize: !bundle.isDevelopment,
			template: useTemplate,
		},
	});

	const rule = {
		test: /\.html$/,
		oneOf: [
			{
				resourceQuery: /raw/,
				use: htmlLoader({ useTemplate: false }),
			},
			{
				use: htmlLoader({ useTemplate: true }),
			},
		],
	};

	return {
		plugins,
		module: { rules: [rule] },
	};
};
