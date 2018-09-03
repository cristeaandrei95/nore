import { variables as vars } from "./postcss.js";
import webpackConfig from "./webpackConfig.js";

export default options => nore => {
	nore.on("bundles:add", bundle => {
		bundle.register(".css", webpackConfig(bundle));
	});

	nore.on("variables:load", variables => {
		vars.setVariables(variables);
	});

	nore.on("variables:change", variables => {
		vars.setVariables(variables);
	});
};
