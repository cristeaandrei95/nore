import VirtualModule from "virtual-module-webpack-plugin";

export default async nore => {
	const variables = await nore.variables.load();
	const moduleName = "@nore/variables.json";
	const contents = JSON.stringify(variables);

	return {
		plugins: [new VirtualModule({ moduleName, contents })],
	};
};
