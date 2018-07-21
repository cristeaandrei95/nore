import VirtualModule from "virtual-module-webpack-plugin";

export default async nore => {
	const variables = await nore.variables.load();
	const moduleName = "$variables";
	const contents = `
		module.exports = ${JSON.stringify(variables)}
	`;

	return {
		plugins: [new VirtualModule({ moduleName, contents })],
	};
};
