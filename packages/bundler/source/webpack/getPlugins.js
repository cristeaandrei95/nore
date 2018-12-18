import { DefinePlugin } from "webpack";
import FriendlyErrors from "friendly-errors-webpack-plugin";
import CaseSensitivePaths from "case-sensitive-paths-webpack-plugin";

export default bundle => {
	const plugins = [
		new CaseSensitivePaths(),
		// TODO: add config constants
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				bundle.isDevelopment ? "development" : "production"
			),
		}),
	];

	// if (!bundle.isDebug) {
	// 	plugins.push(
	// 		new FriendlyErrors({
	// 			clearConsole: true,
	// 		})
	// 	);
	// }

	return plugins;
};
