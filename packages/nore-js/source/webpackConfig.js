import LoadablePlugin from "@loadable/webpack-plugin";
import babel from "./babel.js";

export default async bundle => {
	const plugins = [];

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

	const extensions = [".js", ".jsx", ".json"];

	if (bundle.isNode) {
		plugins.push(new LoadablePlugin());
	}

	return {
		plugins,
		module: { rules },
		resolve: { extensions },
	};
};
