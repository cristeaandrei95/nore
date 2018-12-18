import LoadablePlugin from "@loadable/webpack-plugin";
import babel from "./babel.js";

export default async bundle => {
	const plugins = [];

	const rule = {
		test: /\.jsx?$/,
		enforce: "pre",
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: await babel(bundle),
		},
	};
	const extensions = [".js", ".jsx", ".json"];

	if (bundle.isNode) {
		plugins.push(new LoadablePlugin());
	}

	// run loaders in a worker pool (concurrent) for prformance
	if (!bundle.isDevelopment) {
		rule.use = ["thread-loader", rule.use];
	}

	return {
		plugins,
		module: { rules: [rule] },
		resolve: { extensions },
	};
};
