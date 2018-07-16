import { scssVariables } from "./postcss.js";
import config from "./config.js";

const PLUGIN = ".css";

export default options => ({ hooks, settings }) => {
	hooks.bundle.add(PLUGIN, bundle => {
		scssVariables.setVariables(bundle.variables);
		bundle.register(".css", config(bundle));
	});

	hooks.variables.add(PLUGIN, variables => {
		scssVariables.setVariables(variables);
	});
};
