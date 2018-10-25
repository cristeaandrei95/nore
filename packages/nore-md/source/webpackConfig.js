import babel from "@nore/nore-js/source/babel";

export default async bundle => {
	const rule = {
		test: /\.md?$/,
		use: [
			{
				loader: "babel-loader",
				options: await babel(bundle),
			},
			{
				loader: "@mdx-js/loader",
			},
		],
	};

	return {
		module: { rules: [rule] },
		resolve: {
			extensions: [".mdx", ".md"],
		},
	};
};
