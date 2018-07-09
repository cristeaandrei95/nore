import os from "os";
import Uglify from "uglifyjs-webpack-plugin";
import getBabel from "./babel.js";

export default bundle => {
	const babel = getBabel(bundle);
	const optimization = { minimizer: [] };

	if (bundle.isForWeb && !bundle.isDevelopment) {
		optimization.minimizer.push(
			new Uglify({
				sourceMap: true,
				parallel: os.cpus().length - 1,
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

	return { optimization, module: { rules } };
};
