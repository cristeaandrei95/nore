import Monitor from "../util/Monitor.js";
import log from "../util/log.js";

export default async ({ nore, bundle, port }) => {
	const webpackConfig = bundle.compiler.options;

	log(`server:node started - http://localhost:${port}`);

	const monitor = new Monitor({
		name: bundle.handle,
		file: bundle.output,
		path: bundle.path,
		env: { HTTP_PORT: port },
	});

	async function onCompile(error, stats) {
		log("server:node compiled");

		if (error) return log("ERROR", error);

		switch (monitor.status) {
			case "stopped":
			case "sleeping":
			case "crashed":
				await monitor.start();
				break;
			default:
				await monitor.restart();
		}
	}

	const watching = bundle.compiler.watch(
		{
			aggregateTimeout: 300,
			ignored: ["node_modules"],
		},
		onCompile
	);
};
