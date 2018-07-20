import { watch } from "chokidar";
import { extensions, fileNames } from "./loadVariables.js";

export default (path, handler) => {
	const toWatch = fileNames.map(name => `${name}+(${extensions.join("|")})`);

	const watcher = watch(toWatch, {
		ignoreInitial: true,
		cwd: path,
	});

	["change", "add"].forEach(event => {
		watcher.on(event, async path => {
			await handler(event, path);
		});
	});
};
