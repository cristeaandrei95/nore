import watcher from "./watcher.js";
import webpackConfig from "./webpackConfig.js";
import loadVariables from "./loadVariables.js";

export default options => async nore => {
	nore.plug("variables", {
		path: `${nore.path}/variables`,
		async load() {
			const variables = await loadVariables(this.path, nore);

			if (variables) {
				await nore.emit("variables:load", variables);
			}

			return variables || {};
		},

		watch(onChange) {
			watcher(this.path, async event => {
				const variables = await loadVariables(nore);

				await nore.emit("variables:change", variables, event);

				if (onChange) {
					await Promise.resolve(onChange(variables, event));
				}
			});
		},
	});

	nore.on("nore:bundle", async bundle => {
		bundle.setWebpack(await webpackConfig(bundle, nore));
	});
};
