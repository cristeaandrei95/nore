import webpackConfig from "./webpackConfig.js";

export default options => nore => {
	nore.on("bundle", bundle => {
		bundle.setConfig(webpackConfig(bundle));
	});
};

