import { deleteDirectory } from "@nore/std/fs";
import canLoadRequest from "../util/canLoadRequest";
import webServer from "../servers/web";
import nodeServer from "../servers/node";
import plugins from "../plugins";
import bundles from "../bundles";
import Nore from "../Nore";

export default async cli => {
	const options = Object.assign({ plugins }, cli);
	const nore = new Nore(options);

	await nore.initialize();

	// add default bundles
	for (const { bundle, config } of bundles) {
		// ignore missing bundles
		if (canLoadRequest(`${nore.path}/source/${bundle.handle}`)) {
			await nore.bundles.add(bundle, config);
		}
	}

	// watch variables for changes
	await nore.variables.watch();

	let webServerPort = 7000;
	let nodeServerPort = 5000;

	// compile bundles and watch for changes
	for (const bundle of nore.bundles.cache) {
		// delete the brevious build
		await deleteDirectory(bundle.output);

		if (bundle.isForWeb) {
			await webServer({ nore, bundle, port: webServerPort++ });
		}

		if (bundle.isForNode) {
			await nodeServer({ nore, bundle, port: nodeServerPort++ });
		}
	}
};
