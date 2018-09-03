import webpackConfig from "./webpackConfig.js";

export default options => nore => {
	nore.on("bundles:add", bundle => {
		bundle.register(".toml", webpackConfig(bundle));
	});
};
