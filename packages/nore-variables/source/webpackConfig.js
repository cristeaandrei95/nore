import VirtualModule from "virtual-module-webpack-plugin";

export default async (bundle, nore) => {
	const variables = await nore.variables.load();

	return {
		plugins: [
			new VirtualModule({
				moduleName: "@nore/variables.json",
				contents: JSON.stringify(variables),
			}),
		],
	};
};
