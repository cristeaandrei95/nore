import config from "./config.js";

const PLUGIN = ".toml";

export default options => ({ hooks, settings }) => {
	hooks.bundle.add(PLUGIN, bundle => {
		bundle.register(".toml", config(bundle));
	});
};
