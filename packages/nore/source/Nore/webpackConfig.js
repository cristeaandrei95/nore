import FriendlyErrors from "friendly-errors-webpack-plugin";
import Uglify from "uglifyjs-webpack-plugin";
import { DefinePlugin } from "webpack";
import { assign } from "@nore/std/object";
import os from "os";

export default bundle => {
	const { isDevelopment, isDebug, isForNode, isForWeb } = bundle;

	const config = {
		// the environment in which the bundle will run
		// changes chunk loading behavior and available modules
		target: bundle.target,
		// tells webpack to use its built-in optimizations
		mode: isDevelopment ? "development" : "production",
		name: bundle.handle,
		context: bundle.source,
		// limit the number of parallel processed modules
		parallelism: os.cpus().length - 1,
		// how source maps are generated
		devtool: isDevelopment ? "cheap-module-eval-source-map" : "source-map",
		// profiling
		cache: isDevelopment,
		profile: isDebug,
	};

	config.entry = [bundle.entry || bundle.handle];

	config.output = {
		path: bundle.output,
		filename: isForNode ? "index.js" : "[name].[hash].js",
		// TODO: how to handle publicPath?
		publicPath: isDevelopment ? "/" : "/",
		chunkFilename: "[id].[hash].js",
	};

	config.resolve = {
		mainFields: ["source", "module", "main", "style"],
		mainFiles: ["index", "main", "style"],
		extensions: [".js", ".json"],
		modules: [bundle.source, `${bundle.path}/node_modules`],
		alias: {
			"~": bundle.source,
			$: `~/style`,
		},
	};

	config.optimization = {
		nodeEnv: process.env.NODE_ENV,
		minimizer: [],
	};

	config.plugins = [
		// TODO: add config constants
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				bundle.isDevelopment ? "development" : "production"
			),
		}),
		new FriendlyErrors({
			clearConsole: bundle.isDebug ? false : true,
		}),
	];

	if (isForWeb) {
		config.optimization.runtimeChunk = {
			name: "webpack_runtime",
		};

		resolve.mainFields.unshift("browser");

		if (!isDevelopment) {
			config.optimization.splitChunks = {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "common",
						chunks: "initial",
					},
				},
			};

			config.optimization.minimizer.push(
				new Uglify({
					sourceMap: true,
					parallel: os.cpus().length - 1,
					// TODO: add uglify options
					uglifyOptions: {},
				})
			);
		}
	}

	// turn off webpack output for performance hints
	config.performance = {
		maxAssetSize: 2e5, // 200kb
		maxEntrypointSize: 2e5,
		hints: !isDevelopment && "warning",
		assetFilter: str => !/\.map|mp4|ogg|mov|webm$/.test(str),
	};

	return config;
};
