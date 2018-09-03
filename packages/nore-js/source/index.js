import webpackConfig from "./webpackConfig.js";

export default options => nore => {
	nore.on("bundles:add", bundle => {
		bundle.register(".js", webpackConfig(bundle));
	});
};
