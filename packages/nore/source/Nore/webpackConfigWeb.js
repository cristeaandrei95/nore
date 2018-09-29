import Uglify from "uglifyjs-webpack-plugin";

export default (bundle, config) => {
	config.optimization.runtimeChunk = {
		name: "webpack_runtime",
	};

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

		config.optimization.minimizer.push(
			new Uglify({
				sourceMap: true,
				parallel: os.cpus().length - 1,
				// TODO: add uglify options
				uglifyOptions: {},
			})
		);
	}
};
