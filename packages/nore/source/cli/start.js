import { deleteDirectory } from "@nore/std/fs";
import devServerWeb from "../devServerWeb";
import devServerNode from "../devServerNode";
import Nore from "../Nore";
import plugins from "../plugins";

export default async cli => {
	const nore = new Nore({
		...cli,
		plugins,
		handles: cli._.slice(1),
	});

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

		if (bundle.isForNode) {
			await devServerNode({ nore, bundle, port: nodeServerPort++ });
		}
	}
};
