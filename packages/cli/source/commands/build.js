import { deleteDirectory } from "@nore/std/fs";
import Nore from "../Nore";
import plugins from "../plugins";

export default async cli => {
	const nore = new Nore({
		...cli,
		plugins,
		mode: cli.mode || "production",
		handles: cli._.slice(1),
	});

	// setup plugins and load bundles
	await nore.initialize();

	// compile bundles and watch for changes
	for (const bundle of nore.bundles) {
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
