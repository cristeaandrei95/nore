import config from "./config.js";

const PLUGIN = ".js";

export default options => ({ hooks, settings }) => {
	hooks.bundle.add(PLUGIN, bundle => {
		bundle.register(".js", config(bundle));
	});
};
