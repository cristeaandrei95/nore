import { imageminLoader } from "imagemin-webpack";
import gifsicle from "imagemin-gifsicle";
import mozjpeg from "imagemin-mozjpeg";
import jpegtran from "imagemin-jpegtran";
import optipng from "imagemin-optipng";
import pngquant from "imagemin-pngquant";
import svgo from "imagemin-svgo";

const config = {
	// basic
	gifsicle: {
		interlaced: true,
	},
	svgo: {
		removeTitle: true,
		removeDimensions: true,
		removeViewBox: false,
	},
	// lossless
	jpegtran: {
		progressive: true,
	},
	optipng: {
		optimizationLevel: 5,
	},
	// lossy
	mozjpeg: {},
	pngquant: {},
};

function getImageminOptions(isLossy) {
	const plugins = [gifsicle(config.gifsicle), svgo(config.svgo)];

	// lossy
	if (isLossy) {
		plugins.push(mozjpeg(config.mozjpeg), pngquant(config.pngquant));
	}
	// lossless
	else {
		plugins.push(jpegtran(config.jpegtran), optipng(config.optipng));
	}

	return { plugins };
}

function getCachePath(bundle) {
	return `${bundle.path}/.builds/cache`;
}

export default (bundle, isLossy) => ({
	loader: imageminLoader,
	options: {
		cache: getCachePath(bundle),
		imageminOptions: getImageminOptions(isLossy),
	},
});
