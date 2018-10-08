import TerserWebpack from "terser-webpack-plugin";

export default (bundle, config) => {
	config.optimization.runtimeChunk = {
		name: "webpack_runtime",
	};

	config.optimization.splitChunks = {
		chunks: "all",
		name: false,
	};

	// prevent webpack from injecting mocks to Node native modules
	// that does not make sense for the client
	config.node = {
		dgram: "empty",
		fs: "empty",
		net: "empty",
		tls: "empty",
		child_process: "empty",
		// prevent webpack from injecting a useless setImmediate polyfill
		setImmediate: false,
	};

	// resolve imports using the `browser` field from package.json
	config.resolve.mainFields.unshift("browser");

	if (!bundle.isDevelopment) {
		config.optimization.splitChunks = {
			cacheGroups: {
				vendors: {
					name: `chunk-vendors`,
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: "initial",
				},
				common: {
					name: `chunk-common`,
					minChunks: 2,
					priority: -20,
					chunks: "initial",
					reuseExistingChunk: true,
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
