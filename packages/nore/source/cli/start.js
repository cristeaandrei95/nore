import { deleteDirectory } from "@nore/std/fs";
import devServerWeb from "../core/devServerWeb";
import devServerNode from "../core/devServerNode";
import loadConfig from "../core/loadConfig";
import loadBundles from "../core/loadBundles";
import Nore from "../core/Nore";

export default async options => {
	const config = await loadConfig(options);
	const bundles = await loadBundles(config);
	const nore = new Nore({ ...config, bundles });

	// setup plugins and load bundles
	await nore.initialize();

	// watch variables for changes
	await nore.variables.watch();

	let webServerPort = 7000;
	let nodeServerPort = 5000;

	// compile bundles and watch for changes
	for (const bundle of nore.bundles) {
		// delete the brevious build
		await deleteDirectory(bundle.outputPath);

		if (bundle.isForWeb) {
			await devServerWeb({ nore, bundle, port: webServerPort++ });
		}

		// if (bundle.isForNode) {
		// 	await devServerNode({ nore, bundle, port: nodeServerPort++ });
		// }
	}
};
