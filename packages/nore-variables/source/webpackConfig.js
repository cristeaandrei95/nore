import VirtualModules from "webpack-virtual-modules";

export default async (bundle, nore) => {
	const variables = await nore.variables.load();

	return {
		plugins: [
			new VirtualModules({
				"@nore/variables.json": JSON.stringify(variables),
			}),
		],
	};
};
