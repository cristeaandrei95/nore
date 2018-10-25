import webpackConfig from "./webpackConfig.js";

export default options => nore => {
	nore.on("nore:bundle", async bundle => {
		bundle.setWebpack(await webpackConfig(bundle));
	});
};
