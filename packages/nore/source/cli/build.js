import { deleteDirectory } from "@nore/std/fs";
import { assign } from "@nore/std/object";
import { join } from "@nore/std/path";
import canLoadRequest from "../util/canLoadRequest";
import Nore from "../Nore";
import plugins from "../plugins";
import bundles from "../bundles";

export default async cli => {
	const options = assign(cli, { plugins, mode: "production" });
	const nore = new Nore(options);

	nore.log.info("nore:build", "in progress…");

	// load plugins
	await nore.initialize();
	// load variabiles
	await nore.variables.load();

	// add default bundles
	for (const { bundle, config } of bundles) {
		// ignore missing bundles
		if (canLoadRequest(`${nore.path}/source/${bundle.handle}`)) {
			await nore.bundle(bundle, config);

			nore.log.info("nore:build", `bundle: ${options.handle} – loaded`);
		}
	}

	// compile bundles and watch for changes
	for (const [handle, bundle] of nore.bundles) {
		// delete the brevious build
		await deleteDirectory(bundle.outputPath);

		if (bundle.isForWeb) {
			nore.log.info("nore:build", `bundle: ${bundle.handle} – compile started`);

			const compiler = await bundle.compiler();

			compiler.run((error, stats) => {
				if (error) return console.error(error);

				if (stats.errors) {
					nore.log.info(stats.errors);
				} else {
					nore.log.info(
						"nore:build",
						`bundle: ${bundle.handle} – compile finished`
					);
				}
			});
		}
	}
};
