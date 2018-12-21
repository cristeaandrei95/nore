import webpackConfig from "./webpackConfig.js";
import { variables } from "./postcss";

export default options => async bundle => {
	bundle.setWebpackConfig(await webpackConfig(bundle));

	bundle.on("variables", data => {
		variables.set(data);
	});
};
