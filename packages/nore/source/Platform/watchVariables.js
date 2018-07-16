import { watch } from "chokidar";

export default (path, handler) => {
	const watcher = watch("variables.+(toml|js|json)", {
		ignoreInitial: true,
		cwd: path,
	});

	["change", "add"].forEach(event => {
		watcher.on(event, async path => {
			await handler(event, path);
		});
	});
};
