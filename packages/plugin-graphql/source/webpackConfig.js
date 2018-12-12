export default bundle => {
	const rule = {
		test: /\.(graphql|gql)$/,
		exclude: /node_modules/,
		loader: "graphql-tag/loader",
	};

	return {
		module: {
			rules: [rule],
		},
	};
};
