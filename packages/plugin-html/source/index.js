import webpackConfig from "./webpackConfig.js";

export default options => async bundle => {
	bundle.setWebpackConfig(webpackConfig(bundle));
};
