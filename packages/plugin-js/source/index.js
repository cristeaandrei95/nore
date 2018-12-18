import webpackConfig from "./webpackConfig.js";

export default options => async bundle => {
	bundle.setConfig(await webpackConfig(bundle, options));
};
