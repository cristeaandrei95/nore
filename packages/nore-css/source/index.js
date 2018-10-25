import webpackConfig from "./webpackConfig.js";
import { variables } from "./postcss";

export default options => nore => {
	nore.on("nore:bundle", async bundle => {
		bundle.setWebpack(await webpackConfig(bundle));
	});

	nore.on("variables:load", data => {
		variables.set(data);
	});

	nore.on("variables:change", data => {
		variables.set(data);
	});
};
