import os from "os";

export default bundle => {
	const { isDevelopment, isDebug, isForNode, isForWeb } = bundle;

	const plugins = [];
	const optimization = {};

	const mainFields = ["source", "module", "main", "style"];
	const mainFiles = ["index", "main", "style"];

	if (isForWeb) {
		optimization.runtimeChunk = {
			name: "manifest",
		};

		mainFields.unshift("browser");

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
		// the environment in which the bundle will run
		// changes chunk loading behavior and available modules
		target: bundle.target,
		// tells webpack to use its built-in optimizations
		mode: isDevelopment ? "development" : "production",
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
			mainFields,
			mainFiles,
			extensions: [".js", ".json"],
			modules: [bundle.source, `${bundle.path}/node_modules`],
			alias: {
				"~": bundle.source,
				$: `~/style`,
			},
		},
		// limit the number of parallel processed modules
		parallelism: os.cpus().length - 1,
		// how source maps are generated
		devtool: isDevelopment ? "cheap-module-eval-source-map" : false,
		// profiling
		cache: isDevelopment,
		profile: isDebug,
		plugins,
		optimization,
	};
};
