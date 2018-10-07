import webpackConfig from "./webpackConfig.js";
import { variables as vars } from "./postcss.js";

export default options => nore => {
	nore.on("nore:bundle", async bundle => {
		bundle.register(".css", await webpackConfig(bundle));
	});

	nore.on("variables:load", variables => {
		vars.setVariables(variables);
	});

	nore.on("variables:change", variables => {
		vars.setVariables(variables);
	});
};
