import webpackConfig from "./webpackConfig.js";

export default async bundle => {
	bundle.setWebpackConfig(await webpackConfig(bundle));
};
