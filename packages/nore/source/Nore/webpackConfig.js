import FriendlyErrors from "friendly-errors-webpack-plugin";
import { DefinePlugin } from "webpack";
import { readFileSync } from "fs";
import { assign } from "@nore/std/object";
import os from "os";
import webpackConfigWeb from "./webpackConfigWeb.js";
import webpackConfigNode from "./webpackConfigNode.js";

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
		filename: "[name].[hash].js",
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
			clearConsole: isDebug ? false : true,
		}),
	];

	// turn off webpack output for performance hints
	config.performance = {
		maxAssetSize: 2e5, // 200kb
		maxEntrypointSize: 2e5,
		hints: !isDevelopment && "warning",
		assetFilter: str => !/\.map|mp4|ogg|mov|webm$/.test(str),
	};

	if (isForWeb) {
		webpackConfigWeb(bundle, config);
	}

	if (isForNode) {
		webpackConfigNode(bundle, config);
	}

	return config;
};
