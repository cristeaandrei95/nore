import babelConfig from "@nore/nore-js/babel";

export default bundle => {
	const babel = babelConfig(bundle);

	const rules = [
		{
			test: /\.md?$/,
			use: [
				{
					loader: "babel-loader",
					options: {
						presets: babel.presets,
						plugins: babel.plugins,
						cacheDirectory: bundle.isDevelopment,
						babelrc: false,
					},
				},
				{
					loader: "@mdx-js/loader",
				},
			],
		},
	];

	return {
		module: { rules },
		resolve: {
			extensions: [".mdx", ".md"],
		},
	};
};
