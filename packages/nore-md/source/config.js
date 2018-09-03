import babel from "@nore/nore-js/source/babel";

export default bundle => {
	const rules = [
		{
			test: /\.md?$/,
			use: [
				{
					loader: "babel-loader",
					options: babel(bundle),
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
