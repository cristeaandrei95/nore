import webpackConfig from "./webpackConfig.js";
import { variables } from "./postcss";

export default options => nore => {
	nore.on("bundle", async bundle => {
		bundle.setConfig(await webpackConfig(bundle));
	});

	nore.on("variables:load", data => {
		variables.set(data);
	});

	nore.on("variables:change", data => {
		variables.set(data);
	});
};
