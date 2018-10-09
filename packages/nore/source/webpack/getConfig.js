import FriendlyErrors from "friendly-errors-webpack-plugin";
import CaseSensitivePaths from "case-sensitive-paths-webpack-plugin";
import { DefinePlugin } from "webpack";
import { readFileSync } from "fs";
import { assign } from "@nore/std/object";
import os from "os";
import setWebConfig from "./setWebConfig.js";
import setNodeConfig from "./setNodeConfig.js";

export default bundle => {
	const { isDevelopment, isDebug, isForNode, isForWeb } = bundle;

	const config = {
		name: bundle.handle,
		context: bundle.sourcePath,
		// the environment in which the bundle will run
		// changes chunk loading behavior and available modules
		target: bundle.target,
		// tells webpack to use its built-in optimizations
		mode: isDevelopment ? "development" : "production",
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
		path: bundle.outputPath,
		filename: "[name].[hash].js",
		// TODO: how to handle publicPath?
		publicPath: isDevelopment ? "/" : "/",
		chunkFilename: "[id].[hash].js",
	};

	config.resolve = {
		mainFields: ["source", "module", "main", "style"],
		mainFiles: ["index", "main", "style"],
		extensions: [],
		modules: [bundle.sourcePath, `${bundle.path}/node_modules`],
		alias: {
			"~": bundle.sourcePath,
			$: `${bundle.sourcePath}/styles`,
		},
	};

	config.optimization = {
		nodeEnv: process.env.NODE_ENV,
	};

	// turn off webpack output for performance hints
	config.performance = {
		maxAssetSize: 2e5, // 200kb
		maxEntrypointSize: 2e5,
		hints: !isDevelopment && "warning",
		assetFilter: str => !/\.map|mp4|ogg|mov|webm$/.test(str),
	};

	config.plugins = [
		new CaseSensitivePaths(),
		// TODO: add config constants
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				bundle.isDevelopment ? "development" : "production"
			),
		}),
	];

	if (!isDebug) {
		config.plugins.push(
			new FriendlyErrors({
				clearConsole: true,
			})
		);
	}

	config.module = {
		// makes missing exports an error instead of warning
		strictExportPresence: true,
	};

	if (isForWeb) {
		setWebConfig(bundle, config);
	}

	if (isForNode) {
		setNodeConfig(bundle, config);
	}

	return config;
};
