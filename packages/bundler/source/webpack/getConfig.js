import merge from "webpack-merge";
import getPlugins from "./getPlugins.js";
import getWebConfig from "./getWebConfig.js";
import getNodeConfig from "./getNodeConfig.js";

export default bundle => {
	const config = {
		name: bundle.handle,
		context: bundle.sourcePath,
		// the environment in which the bundle will run
		// changes chunk loading behavior and available modules
		target: bundle.target,
		// tells webpack to use its built-in optimizations
		mode: bundle.isDevelopment ? "development" : "production",
		// how source maps are generated
		devtool: bundle.isDevelopment
			? "cheap-module-eval-source-map"
			: "source-map",
		// profiling
		cache: bundle.isDevelopment,
		profile: bundle.isDebug,
	};

	config.entry = [bundle.entry || bundle.handle];

	config.output = {
		path: bundle.outputPath,
		publicPath: bundle.publicPath,
		filename: "[name].[hash].js",
		chunkFilename: "[id].[hash].js",
	};

	config.resolve = {
		mainFields: ["source", "module", "main"],
		mainFiles: ["index", "main"],
		extensions: [".js"],
		modules: [bundle.sourcePath, `${bundle.path}/node_modules`],
		alias: {
			"~": bundle.sourcePath,
			$: `${bundle.sourcePath}/styles`,
		},
	};

	config.module = {
		// makes missing exports an error instead of warning
		strictExportPresence: true,
	};

	config.optimization = {
		nodeEnv: process.env.NODE_ENV,
	};

	// turn off webpack output for performance hints
	config.performance = {
		maxAssetSize: 2e5, // 200kb
		maxEntrypointSize: 2e5,
		hints: !bundle.isDevelopment && "warning",
		assetFilter: str => !/\.map|mp4|ogg|mov|webm$/.test(str),
	};

	config.plugins = getPlugins(bundle);

	if (bundle.isForWeb) {
		return merge(config, getWebConfig(bundle));
	}

	if (bundle.isForNode) {
		return merge(config, getNodeConfig(bundle));
	}
};
