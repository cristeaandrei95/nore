import babel from "./babel.js";

export default bundle => {
	const rules = [
		{
			test: /\.jsx?$/,
			enforce: "pre",
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: babel(bundle),
			},
		},
	];

	return {
		entry: bundle.isForWeb ? ["@babel/polyfill"] : [],
		module: { rules },
		resolve: {
			extensions: [".js", ".jsx", ".json"],
		},
	};
};
