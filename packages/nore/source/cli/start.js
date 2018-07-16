import { deleteDirectory } from "@nore/std/fs";
import { join } from "@nore/std/path";
import canLoadRequest from "../util/canLoadRequest";
import Platform from "../Platform";
import webServer from "../Platform/webServer";
import nodeServer from "../Platform/nodeServer";
import plugins from "../plugins";
import bundles from "../bundles";

export default async cli => {
	const nore = new Platform(cli);

	await nore.loadVariables();
	await nore.loadPlugins(plugins);

	// try to load default bundles
	for (const { options, config } of bundles) {
		const file = join(nore.path, options.source, options.handle);

		// ignore missing bundles
		if (!canLoadRequest(file)) continue;

		await nore.loadBundle(options, config);
	}

	let webServerPort = 7000;
	let nodeServerPort = 5000;

	// compile bundles and watch for changes
	for (const [_, bundle] of nore.bundles) {
		await bundle.makeCompiler();

		// delete the brevious build
		await deleteDirectory(bundle.output);

		if (bundle.isForWeb) {
			webServer({ nore, bundle, port: webServerPort++ });
		}

		if (bundle.isForNode) {
			nodeServer({ nore, bundle, port: nodeServerPort++ });
		}
	}
};
