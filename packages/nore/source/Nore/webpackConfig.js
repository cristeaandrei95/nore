import os from "os";
import FriendlyErrors from "friendly-errors-webpack-plugin";

export default bundle => {
	const { isDevelopment, isDebug, isForNode, isForWeb } = bundle;

	const optimization = {};

	const plugins = [
		new FriendlyErrors({
			clearConsole: bundle.isDebug ? false : true,
		}),
	];

	const resolve = {
		mainFields: ["source", "module", "main", "style"],
		mainFiles: ["index", "main", "style"],
		extensions: [".js", ".json"],
		modules: [bundle.source, `${bundle.path}/node_modules`],
		alias: {
			"~": bundle.source,
			$: `~/style`,
		},
	};

	if (isForWeb) {
		optimization.runtimeChunk = {
			name: "webpack_runtime",
		};

		resolve.mainFields.unshift("browser");

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
		plugins,
		optimization,
		resolve,
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
		// limit the number of parallel processed modules
		parallelism: os.cpus().length - 1,
		// how source maps are generated
		devtool: isDevelopment ? "cheap-module-eval-source-map" : false,
		// profiling
		cache: isDevelopment,
		profile: isDebug,
		// turn off webpack output for performance hints
		performance: { hints: false },
	};
};
