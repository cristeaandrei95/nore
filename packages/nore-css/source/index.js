import webpackConfig from "./webpackConfig.js";
import { variables as vars } from "./postcss.js";

export default options => nore => {
	nore.on("nore:bundle", bundle => {
		bundle.register(".css", webpackConfig(bundle));
	});

	nore.on("variables:load", variables => {
		vars.setVariables(variables);
	});

	nore.on("variables:change", variables => {
		vars.setVariables(variables);
	});
};
