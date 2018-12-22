import { Bundle } from "@nore/bundler";
import loadConfigs from "~/utils/loadConfigs.js";

export default async ({ args }) => {
	const options = {
		path: args["--path"],
		mode: args["--mode"],
		isDebug: args["--debug"],
		handles: args._.slice(1),
	};

	const configs = await loadConfigs(options);

	for (const config of configs) {
		const bundle = new Bundle(config);

		// run bundle plugins
		await bundle.initialize();

		// start development server
		await bundle.serve();
	}
};
