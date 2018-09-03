import { join, resolve, relative } from "@nore/std/path";

function getCompilerName(output) {
	const file = join(output.publicPath, output.filename);

	return `PluginHTML for "${file}"`;
}

export default ({ compilation, context, template, target }) => {
	const { assets } = compilation;
	const { publicPath, filename } = compilation.outputOptions;
	const output = { publicPath, filename: target };

	const file = join(context, template);
	const assetBefore = Object.assign({}, assets[filename]);

	const compilerName = getCompilerName(output);
	const compiler = compilation.createChildCompiler(compilerName, output);

	console.log("in compilation child");
	console.log(compiler.context);
};
