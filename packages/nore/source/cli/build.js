import { deleteDirectory } from "@nore/std/fs";
import { assign } from "@nore/std/object";
import { join } from "@nore/std/path";
import canLoadRequest from "../util/canLoadRequest";
import log from "../util/log";
import Platform from "../Platform";
import plugins from "../plugins";
import bundles from "../bundles";

export default async cli => {
	log("nore:build", "in progress…");

	const options = assign({}, cli, { mode: "production" });
	const nore = new Platform(options);

	await nore.loadVariables();
	await nore.loadPlugins(plugins);

	// try to load default bundles
	for (const { options, config } of bundles) {
		const file = join(nore.path, options.source, options.handle);

		// ignore missing bundles
		if (!canLoadRequest(file)) continue;

		await nore.loadBundle(options, config);

		log("nore:build", `bundle: ${options.handle} – loaded`);
	}

	// compile bundles and watch for changes
	for (const [_, bundle] of nore.bundles) {
		if (bundle.isForWeb) {
			// delete the brevious build
			await deleteDirectory(bundle.output);

			log("nore:build", `bundle: ${bundle.handle} – compile started`);

			const stats = await bundle.compile();

			if (stats.errors) {
				log(stats.errors);
			} else {
				log("nore:build", `bundle: ${bundle.handle} – compile finished`);
			}
		}
	}
};
