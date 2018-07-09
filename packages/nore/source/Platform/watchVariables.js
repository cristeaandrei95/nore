import { watch } from "chokidar";

export default (nore, handler) => {
	const watcher = watch("source/variables.+(toml|js|json)", {
		ignoreInitial: true,
		cwd: nore.path,
	});

	["change", "add"].forEach(event => {
		watcher.on(event, path => {
			handler(event, path);
		});
	});
};
