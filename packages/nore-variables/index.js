import { readDirectory } from "@nore/std/fs";
import watcher from "./watcher.js";
import format from "./format.js";
import plugin from "./plugin.js";

export default options => async nore => {
	nore.plug("variables", {
		async load() {
			const files = await readDirectory(`${nore.path}/variables`);
			const datasets = await Promise.all(files.map(file => nore.load(file)));
			const variables = format(datasets, files);

			await nore.emit("variables:load", variables);

			return variables;
		},

		watch(onChange) {
			watcher({
				path: nore.path,
				onChange: async event => {
					const variables = await this.load();

					await nore.emit("variables:change", variables, event);

					if (onChange) {
						await Promise.resolve(onChange(variables, event));
					}
				},
			});
		},
	});

	nore.on("bundles:add", async bundle => {
		bundle.register("variables", await plugin(nore));
	});
};
