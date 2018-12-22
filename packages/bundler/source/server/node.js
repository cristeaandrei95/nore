import ProcessManager from "@nore/pm";

export default async bundle => {
	const compiler = await bundle.compiler();
	const webpackConfig = compiler.options;
	const cmd = [process.execPath, bundle.outputPath];

	const pm = new ProcessManager(cmd, {
		restartDelay: 300,
		stdio: "inherit",
		cwd: bundle.path,
	});

	async function onCompile(error, stats) {
		console.log("server:node compiled");

		if (error) {
			return console.log({ error });
		}

		await pm.restart();
	}

	const watchOptions = {
		aggregateTimeout: 300,
		ignored: ["node_modules"],
	};

	const watcher = compiler.watch(watchOptions, onCompile);

	// watch variables for changes
	bundle.on("variables", async (variables, event) => {
		console.log(`watch:variables [change] "${event.path}"`);

		// rebundle the code
		watcher.invalidate();
	});
};
