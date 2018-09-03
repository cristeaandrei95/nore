import { watch } from "chokidar";

export default ({ path, onChange }) => {
	const watcher = watch("*", {
		ignoreInitial: true,
		cwd: `${path}/variables`,
	});

	["change", "add"].forEach(event => {
		watcher.on(event, path => {
			onChange({ type: event, path });
		});
	});
};
