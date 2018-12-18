import { readDirectory, itExists } from "@nore/std/fs";
import webpackConfig from "./webpackConfig.js";
import watcher from "./watcher.js";
import format from "./format.js";

export default options => async bundle => {
	bundle.plug("variables", {
		path: `${bundle.path}/variables`,

		async load() {
			if (!(await itExists(this.path))) {
				return {};
			}

			const files = await readDirectory(this.path);
			const datasets = await Promise.all(files.map(file => bundle.load(file)));
			const variables = format(datasets, files);

			if (variables) {
				await bundle.emit("variables", variables);
			}

			return variables || {};
		},

		watch(onChange) {
			watcher(this.path, async event => {
				const variables = await this.load();

				if (onChange) {
					await onChange(variables, event);
				}
			});
		},
	});

	bundle.setConfig(await webpackConfig(bundle));
};
