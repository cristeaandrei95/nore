import { deleteDirectory } from "@nore/std/fs";
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

		await bundle.initialize();
		await deleteDirectory(bundle.outputPath);

		const compiler = await bundle.compiler();

		console.log(compiler.options);
		// compiler.run((error, stats) => {
		// 	if (!error || !stats.compilation.errors.length) {
		// 		console.log(`Bundle "${bundle.handle}" was compiled.`);
		// 	}
		// });
	}
};
