import babel from "./babel.js";

export default bundle => {
	const rules = [
		{
			test: /\.m?jsx?$/,
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
			extensions: [".js", ".json", ".jsx", ".mjs"],
		},
	};
};
