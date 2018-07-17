import os from "os";
import { DefinePlugin } from "webpack";
import Uglify from "uglifyjs-webpack-plugin";
import getBabel from "./babel.js";

export default bundle => {
	const babel = getBabel(bundle);

	const plugins = [
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				bundle.isDevelopment ? "development" : "production"
			),
			DEVELOPMENT: bundle.isDevelopment,
		}),
	];

	const optimization = { minimizer: [] };

	if (bundle.isForWeb && !bundle.isDevelopment) {
		optimization.minimizer.push(
			new Uglify({
				sourceMap: true,
				parallel: os.cpus().length - 1,
				// TODO: add uglify options
				uglifyOptions: {},
			})
		);
	}

	const rules = [
		{
			test: /\.m?jsx?$/,
			enforce: "pre",
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: babel.presets,
					plugins: babel.plugins,
					cacheDirectory: bundle.isDevelopment,
					babelrc: false,
				},
			},
		},
	];

	return { plugins, optimization, module: { rules } };
};
