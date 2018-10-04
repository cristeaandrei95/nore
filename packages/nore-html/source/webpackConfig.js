import HTMLPlugin from "html-webpack-plugin";
import InlineWebpackRuntime from "./InlineWebpackRuntime.js";

function loader({ isDevelopment, isTemplate }) {
	return {
		loader: "html-loader",
		options: {
			minimize: !isDevelopment,
			template: isTemplate,
		},
	};
}

export default bundle => {
	const plugins = [
		new HTMLPlugin({
			config: bundle.config,
			source: bundle.sourcePath,
			isDevelopment: bundle.isDevelopment,
			template: `${__dirname}/template.js`,
			inject: false,
		}),
	];

	if (bundle.isForWeb) {
		plugins.push(
			// webpack's runtime always change between every build it's
			// better to split the runtime code out for long-term caching
			new InlineWebpackRuntime("webpack_runtime")
		);
	}

	const rules = [
		{
			test: /\.html$/,
			oneOf: [
				{
					resourceQuery: /raw/,
					use: loader({
						isDevelopment: bundle.isDevelopment,
						isTemplate: false,
					}),
				},
				{
					use: loader({
						isDevelopment: bundle.isDevelopment,
						isTemplate: true,
					}),
				},
			],
		},
	];

	return {
		plugins,
		module: { rules },
	};
};
