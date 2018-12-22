import { DefinePlugin } from "webpack";
import CaseSensitivePaths from "case-sensitive-paths-webpack-plugin";
import FriendlyErrors from "friendly-errors-webpack-plugin";

export default bundle => {
	const plugins = [
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				bundle.isDevelopment ? "development" : "production"
			),
		}),
		new CaseSensitivePaths(),
	];

	if (!bundle.isDevelopment) {
		plugins.push(new FriendlyErrors({ clearConsole: true }));
	}

	return plugins;
};
