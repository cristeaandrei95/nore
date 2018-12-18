import webpackConfig from "./webpackConfig.js";
import { variables } from "./postcss";

export default options => async bundle => {
	bundle.setConfig(await webpackConfig(bundle));

	bundle.on("variables", data => {
		variables.set(data);
	});
};
