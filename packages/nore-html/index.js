import config from "./config.js";

const PLUGIN = ".html";

export default options => ({ hooks, settings }) => {
	hooks.bundle.add(PLUGIN, bundle => {
		bundle.register(".html", config(bundle));
	});
};
