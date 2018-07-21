import config from "./config.js";

export default options => nore => {
	nore.on("bundles:add", bundle => {
		bundle.register(".html", config(bundle));
	});
};

