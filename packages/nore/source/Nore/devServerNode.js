import ProcessManager from "../util/ProcessManager.js";

export default async ({ nore, bundle, port }) => {
	const log = nore.log.child({ service: `node:server:${bundle.handle}` });
	const compiler = await bundle.compiler();
	const webpackConfig = compiler.options;

	log.info(`server:node started - http://localhost:${port}`);

	const pm = new ProcessManager({
		name: bundle.handle,
		file: bundle.output,
		path: bundle.path,
		env: { HTTP_PORT: port },
	});

	async function onCompile(error, stats) {
		log.info("server:node compiled");

		if (error) {
			return log.error({ error });
		}

		switch (pm.status) {
			case "stopped":
			case "sleeping":
			case "crashed":
				await pm.start();
				break;
			default:
				await pm.restart();
		}
	}

	const watchOptions = {
		aggregateTimeout: 300,
		ignored: ["node_modules"],
	};

	compiler.watch(watchOptions, onCompile);
};
