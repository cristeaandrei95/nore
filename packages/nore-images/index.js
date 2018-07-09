import config from "./config.js";

const PLUGIN = "images";

export default options => ({ hooks, settings }) => {
	hooks.bundle.add(PLUGIN, bundle => {
		bundle.register("images", config(bundle));
	});
};
