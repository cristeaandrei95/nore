import webpackConfig from "./webpackConfig.js";

export default options => nore => {
	nore.on("nore:bundle", async bundle => {
		bundle.setConfig(await webpackConfig(bundle, nore));
	});
};
