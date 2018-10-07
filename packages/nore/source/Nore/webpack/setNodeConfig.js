import VirtualModule from "virtual-module-webpack-plugin";
import nodeGlobalHelpers from "./nodeGlobalHelpers.js";

export default (bundle, config) => {
	config.output.filename = "index.js";

	config.plugins.push(
		new VirtualModule({
			moduleName: "@nore/node.js",
			contents: nodeGlobalHelpers,
		})
	);

	// turn off performance hints on node builds
	config.performance = false;
};
