import { readDirectory, itExists } from "@nore/std/fs";
import watcher from "./watcher.js";
import format from "./format.js";
import webpackConfig from "./webpackConfig.js";

export default options => async nore => {
	nore.plug("variables", {
		async load() {
			const variablesDirectory = `${nore.path}/variables`;

			if (await itExists(variablesDirectory)) {
				const files = await readDirectory(variablesDirectory);
				const datasets = await Promise.all(files.map(file => nore.load(file)));
				const variables = format(datasets, files);

				await nore.emit("variables:load", variables);

				return variables;
			} else {
				return {};
			}
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

	nore.on("nore:bundle", async bundle => {
		bundle.register("variables", await webpackConfig(bundle, nore));
	});
};
