import config from "./config.js";

const PLUGIN = ".md";

export default options => ({ hooks, settings }) => {
	hooks.bundle.add(PLUGIN, bundle => {
		bundle.register(".md", config(bundle));
	});
};
