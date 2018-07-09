import { cssVariables } from "./postcss.js";
import config from "./config.js";

const PLUGIN = ".css";

export default options => ({ hooks, settings }) => {
	hooks.bundle.add(PLUGIN, bundle => {
		bundle.register(".css", config(bundle));
	});

	hooks.variables.add(PLUGIN, variables => {
		cssVariables.setVariables(variables);
	});
};
