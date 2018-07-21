import os from "os";

export default bundle => {
	const { isDevelopment, isForNode, isForWeb } = bundle;

	const plugins = [];
	const optimization = {};

	if (isForWeb) {
		optimization.runtimeChunk = {
			name: "manifest",
		};

		if (!isDevelopment) {
			optimization.splitChunks = {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "common",
						chunks: "initial",
					},
				},
			};
		}
	}

	return {
		name: bundle.handle,
		context: bundle.source,
		entry: [bundle.entry || bundle.handle],
		output: {
			path: bundle.output,
			filename: isForNode ? "index.js" : "[name].[hash].js",
			// TODO: how to handle publicPath?
			publicPath: isDevelopment ? "/" : "/",
			chunkFilename: "[id].[hash].js",
		},
		resolve: {
			extensions: [".js", ".json", ".jsx", ".mjs", ".css"],
			mainFields: ["browser", "module", "main", "style"],
			mainFiles: ["index", "style"],
			modules: [bundle.source, `${bundle.path}/node_modules`],
			alias: {
				"~": bundle.source,
				nore: `~/application`,
			},
		},
		// the environment in which the bundle will run
		// changes chunk loading behavior and available modules
		target: bundle.target,
		// tells webpack to use its built-in optimizations
		mode: isDevelopment ? "development" : "production",
		// limit the number of parallel processed modules
		parallelism: os.cpus().length - 1,
		// how source maps are generated
		devtool: isDevelopment ? "cheap-module-eval-source-map" : false,
		// profiling
		cache: isDevelopment,
		// profile: isDevelopment
		plugins,
		optimization,
	};
};
