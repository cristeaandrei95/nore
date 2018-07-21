import { watch } from "chokidar";

export default ({ files, extensions, path, onChange }) => {
	const target = files.map(name => `${name}+(${extensions.join("|")})`);

	const watcher = watch(target, {
		ignoreInitial: true,
		cwd: path,
	});

	["change", "add"].forEach(event => {
		watcher.on(event, path => {
			onChange({ type: event, path });
		});
	});
};
