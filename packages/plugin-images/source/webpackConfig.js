import getImageminOptions from "./getImageminOptions.js";
import svgLoaders from "./svgLoaders.js";
import pngJpgGifLoaders from "./pngJpgGifLoaders.js";

export default async bundle => {
	const imageminOptions = await getImageminOptions(bundle);

	const imagesRule = {
		test: /\.(jpe?g|png|gif)$/,
		oneOf: [
			{
				resourceQuery: /lossy/,
				use: pngJpgGifLoaders({ bundle, imageminOptions, isLossy: true }),
			},
			{
				use: pngJpgGifLoaders({ bundle, imageminOptions, isLossy: false }),
			},
		],
	};

	const svgRule = {
		test: /\.svg$/,
		use: svgLoaders({ bundle, imageminOptions }),
	};

	return {
		module: { rules: [svgRule, imagesRule] },
	};
};
