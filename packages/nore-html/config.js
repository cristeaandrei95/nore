import HTMLPlugin from "html-webpack-plugin";
import InlineManifest from "./InlineManifest";
// TODO: implement our own?
// import PluginHTML from "./PluginHTML.js";

function loader({ isDevelopment, isTemplate }) {
	return {
		loader: "html-loader",
		options: {
			minimize: !isDevelopment,
			template: isTemplate,
		},
	};
}

export default bundle => {
	const plugins = [];

	if (bundle.isForWeb) {
		plugins.push(
			new HTMLPlugin({
				config: bundle.config,
				source: bundle.source,
				isDevelopment: bundle.isDevelopment,
				template: `${__dirname}/template.js`,
				inject: false,
			}),
			new InlineManifest("manifest")
		);
	}

	const rules = [
		{
			test: /\.html$/,
			oneOf: [
				{
					resourceQuery: /raw/,
					use: loader({
						isDevelopment: bundle.isDevelopment,
						isTemplate: false,
					}),
				},
				{
					use: loader({
						isDevelopment: bundle.isDevelopment,
						isTemplate: true,
					}),
				},
			],
		},
	];

	return {
		plugins,
		module: { rules },
	};
};
