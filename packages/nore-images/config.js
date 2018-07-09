import svgLoaders from "./svgLoaders.js";
import pngJpgGifLoaders from "./pngJpgGifLoaders.js";

export default bundle => {
	const loosyOrLossless = type => {
		const loaders = type == "svg" ? svgLoaders : pngJpgGifLoaders;

		const tests = {
			"jpg|png|gif": /\.(jpe?g|png|gif)$/,
			svg: /\.svg$/,
		};

		return {
			test: tests[type],
			oneOf: [
				{
					resourceQuery: /lossy/,
					use: loaders({ bundle, isLossy: true }),
				},
				{
					use: loaders({ bundle, isLossy: false }),
				},
			],
		};
	};

	return {
		module: {
			rules: [loosyOrLossless("svg"), loosyOrLossless("jpg|png|gif")],
		},
	};
};
