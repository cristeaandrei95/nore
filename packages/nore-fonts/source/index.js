import webpackConfig from "./webpackConfig.js";

export default options => nore => {
	nore.on("nore:bundle", bundle => {
		bundle.register("fonts", webpackConfig(bundle));
	});
};
