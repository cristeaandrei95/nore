import config from "./config.js";

const PLUGIN = "fonts";

export default options => ({ hooks, settings }) => {
	hooks.bundle.add(PLUGIN, bundle => {
		bundle.register("fonts", config(bundle));
	});
};
