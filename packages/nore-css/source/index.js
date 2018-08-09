import { scssVariables } from "./postcss.js";
import config from "./config.js";

export default options => nore => {
	nore.on("bundles:add", bundle => {
		bundle.register(".css", config(bundle));
	});

	nore.on("variables:load", variables => {
		scssVariables.setVariables(variables);
	});

	nore.on("variables:change", variables => {
		scssVariables.setVariables(variables);
	});
};
