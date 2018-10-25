import { VirtualModule } from "@nore/webpack";
import getNodeExternals from "webpack-node-externals";
import nodeGlobalHelpers from "./nodeGlobalHelpers.js";

export default (bundle, config) => {
	config.output.filename = "index.js";

	// ignore modules from node_modules folder
	config.externals = [
		getNodeExternals({
			whitelist: [
				// @nore modules
				/@nore.+/,
				// CSS imports
				/\.(css|less|scss|sss)$/,
				// image imports
				/\.(bmp|gif|jpe?g|png|svg)$/,
			],
		}),
	];

	config.plugins.push(
		new VirtualModule({
			name: "@nore/node.js",
			source: nodeGlobalHelpers,
		})
	);

	// turn off performance hints on node builds
	config.performance = false;
};
