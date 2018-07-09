import babel from "@nore/nore-js/babel";

export default bundle => {
	const { isDevelopment } = bundle;
	const { presets, plugins } = babel(bundle);

	return {
		module: {
			rules: [
				{
					test: /\.md?$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								presets,
								plugins,
								babelrc: false,
								cacheDirectory: isDevelopment,
							},
						},
						{
							loader: "@mdx-js/loader",
						},
					],
				},
			],
		},
	};
};
