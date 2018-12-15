import webpackConfig from "./webpackConfig.js";

export default options => nore => {
	nore.on("bundle", async bundle => {
		bundle.setConfig(await webpackConfig(bundle));
	});
};
