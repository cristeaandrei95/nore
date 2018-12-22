export default bundle => {
	const config = {};

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
	config.resolve = { mainFields: ["browser"] };

	config.optimization = {
		runtimeChunk: {
			name: "webpack_runtime",
		},
		splitChunks: {
			chunks: "all",
			name: false,
		},
	};

	if (!bundle.isDevelopment) {
		config.optimization.splitChunks = {
			chunks: "async",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: "~",
			name: true,
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
	}

	return config;
};
