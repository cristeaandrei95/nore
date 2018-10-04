import { deleteDirectory } from "@nore/std/fs";
import canLoadRequest from "../util/canLoadRequest";
import devServerWeb from "../Nore/devServerWeb";
import devServerNode from "../Nore/devServerNode";
import Nore from "../Nore";
import plugins from "../plugins";
import bundles from "../bundles";

export default async cli => {
	const options = Object.assign({ plugins }, cli);
	const nore = new Nore(options);

	await nore.initialize();

	// add default bundles
	for (const { bundle, config } of bundles) {
		// ignore missing bundles
		if (canLoadRequest(`${nore.path}/source/${bundle.handle}`)) {
			await nore.bundle(bundle, config);
		}
	}

	// watch variables for changes
	await nore.variables.watch();

	let webServerPort = 7000;
	let nodeServerPort = 5000;

	// compile bundles and watch for changes
	for (const [handle, bundle] of nore.bundles) {
		// delete the brevious build
		await deleteDirectory(bundle.outputPath);

		if (bundle.isForWeb) {
			await devServerWeb({ nore, bundle, port: webServerPort++ });
		}

		if (bundle.isForNode) {
			await devServerNode({ nore, bundle, port: nodeServerPort++ });
		}
	}
};
