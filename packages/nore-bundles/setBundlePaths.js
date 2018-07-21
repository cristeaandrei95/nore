import { isAbsolute, join } from "@nore/std/path";

function normalize(file, path) {
	return isAbsolute(file) ? file : join(path, file);
}

export default (bundle, options) => {
	bundle.source = options.source
		? normalize(options.source, bundle.path)
		: `${bundle.path}/source`;

	bundle.output = options.output
		? normalize(options.output, bundle.path)
		: `${bundle.path}/.builds/${bundle.handle}`;

	bundle.webpackExtend = options.webpack
		? normalize(options.webpack, bundle.path)
		: `${bundle.path}/source/webpack.${bundle.handle}.js`;
};
