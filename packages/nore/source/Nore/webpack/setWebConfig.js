import TerserWebpack from "terser-webpack-plugin";

export default (bundle, config) => {
	config.optimization.runtimeChunk = {
		name: "webpack_runtime",
	};

	config.optimization.splitChunks = {
		chunks: "all",
		name: false,
	};

	// some libraries import Node modules but don't use them in the browser
	// provide empty mocks for them so importing them works
	config.node = {
		dgram: "empty",
		fs: "empty",
		net: "empty",
		tls: "empty",
		child_process: "empty",
	};

	// resolve imports using the `browser` field from package.json
	config.resolve.mainFields.unshift("browser");

	if (!bundle.isDevelopment) {
		config.optimization.splitChunks = {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "common",
					chunks: "initial",
				},
			},
		};

		config.optimization.minimizer = [
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
};
