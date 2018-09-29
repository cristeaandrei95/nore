import VirtualModule from "virtual-module-webpack-plugin";
import nodeHelpers from "./nodeHelpers.js";

export default (bundle, config) => {
	config.output.filename = "index.js";

	config.plugins.push(
		new VirtualModule({
			moduleName: "@nore/node.js",
			contents: nodeHelpers,
		})
	);
};
