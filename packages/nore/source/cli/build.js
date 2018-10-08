import { deleteDirectory } from "@nore/std/fs";
import loadBundles from "../Nore/loadBundles";
import Nore from "../Nore";
import plugins from "../plugins";

export default async cli => {
	const nore = new Nore(Object.assign(cli, { plugins, mode: "production" }));

	const bundles = await loadBundles({
		selected: cli._.slice(1),
		path: nore.path,
		mode: nore.mode,
	});

	// setup plugins
	await nore.initialize();

	// add bundles
	for (const options of bundles) {
		await nore.bundle(options);
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
