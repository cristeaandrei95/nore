import { VirtualModule } from "@nore/webpack";
import getNodeExternals from "webpack-node-externals";
import webpack from "webpack";
import nodeGlobalHelpers from "./nodeGlobalHelpers.js";

const { LimitChunkCountPlugin } = webpack.optimize;

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
		new LimitChunkCountPlugin({ maxChunks: 1 }),
	],

	// turn off performance hints on node builds
	performance: false,
});
