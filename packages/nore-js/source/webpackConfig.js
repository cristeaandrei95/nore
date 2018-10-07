import babel from "./babel.js";

export default async bundle => {
	const rules = [
		{
			test: /\.jsx?$/,
			enforce: "pre",
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: await babel(bundle),
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
