import { VirtualModule } from "@nore/webpack";
import getNodeExternals from "webpack-node-externals";
import nodeGlobalHelpers from "./nodeGlobalHelpers.js";

export default bundle => ({
	output: { filename: "index.js" },

	// ignore modules from node_modules folder
	externals: [
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
	],

	plugins: [
		new VirtualModule({
			name: "@nore/node.js",
			source: nodeGlobalHelpers,
		}),
	],

	// turn off performance hints on node builds
	performance: false,
});
