import { join } from "@nore/std/path";
import canLoadRequest from "../util/canLoadRequest";
import Platform from "../Platform";
import webServer from "../Platform/webServer";
import nodeServer from "../Platform/nodeServer";
import plugins from "../plugins";
import bundles from "../bundles";
import watchVariables from "../Platform/watchVariables";

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

	// watch variables for changes
	if (nore.bundles.size) {
		watchVariables(nore, async event => {
			await nore.loadVariables();
		});
	}

	let webServerPort = 7000;
	let nodeServerPort = 5000;

	// compile bundles and watch for changes
	for (const [_, bundle] of nore.bundles) {
		await bundle.compiler();

		if (bundle.isForWeb) {
			webServer(bundle, { port: webServerPort++ });
		}

		if (bundle.isForNode) {
			nodeServer(bundle, { port: nodeServerPort++ });
		}
	}
};
