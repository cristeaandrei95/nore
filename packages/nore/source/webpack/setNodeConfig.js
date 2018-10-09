import VirtualModules from "webpack-virtual-modules";
import getNodeExternals from "webpack-node-externals";
import nodeGlobalHelpers from "./nodeGlobalHelpers.js";

export default (bundle, config) => {
	config.output.filename = "index.js";

	// ignore all modules from node_modules folder
	config.externals = [
		getNodeExternals({
			whitelist: [/@nore.+/],
		}),
	];

	config.plugins.push(
		new VirtualModules({
			"@nore/node.js": nodeGlobalHelpers,
		})
	);

	// turn off performance hints on node builds
	config.performance = false;
};
