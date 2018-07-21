import watcher from "./watcher.js";
import format from "./format.js";
import plugin from "./plugin.js";

const fileNames = ["variables", "variables.options", "variables.decisions"];
const extensions = [".yaml", ".toml", ".json", ".js"];

export default options => async nore => {
	nore.plug("variables", {
		async load() {
			// default path: source/variables.[yaml|toml|js|json]
			const files = fileNames.map(name => `${nore.path}/source/${name}`);
			const datasets = await Promise.all(files.map(file => nore.load(file)));
			const variables = format(datasets, fileNames);

			await nore.emit("variables:load", variables);

			return variables;
		},

		watch(onChange) {
			watcher({
				extensions,
				files: fileNames,
				path: `${nore.path}/source`,
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
