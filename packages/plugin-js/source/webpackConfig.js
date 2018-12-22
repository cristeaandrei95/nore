import TerserWebpack from "terser-webpack-plugin";
import LoadableWebpack from "@loadable/webpack-plugin";
import babel from "./babel.js";

export default async bundle => {
	const optimization = {};
	const plugins = [];

	const resolve = {
		extensions: [".js", ".jsx", ".json"],
	};

	const rule = {
		test: /\.jsx?$/,
		enforce: "pre",
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: await babel(bundle),
		},
	};

	if (bundle.isNode) {
		plugins.push(new LoadableWebpack());
	}

	if (!bundle.isDevelopment) {
		// run loaders in a worker pool (concurrent) for prformance
		rule.use = ["thread-loader", rule.use];

		// use terser to minimize JS code
		optimization.minimizer = [
			new TerserWebpack({
				cache: bundle.cachePath,
				sourceMap: true,
				parallel: true,
				terserOptions: {
					parse: { ecma: 8 },
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
					},
					mangle: { safari10: true },
					output: {
						ecma: 5,
						comments: false,
						// turned on because emoji and regex is not minified properly
						ascii_only: true,
					},
				},
			}),
		];
	}

	return {
		plugins,
		resolve,
		optimization,
		module: { rules: [rule] },
	};
};
