import VirtualModules from "webpack-virtual-modules";
import nodeGlobalHelpers from "./nodeGlobalHelpers.js";

export default (bundle, config) => {
	config.output.filename = "index.js";

	config.plugins.push(
		new VirtualModules({
			"@nore/node.js": nodeGlobalHelpers,
		})
	);

	// turn off performance hints on node builds
	config.performance = false;
};
