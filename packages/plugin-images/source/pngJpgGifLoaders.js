import ImageminPlugin from "imagemin-webpack";
import gifsicle from "imagemin-gifsicle";
import mozjpeg from "imagemin-mozjpeg";
import jpegtran from "imagemin-jpegtran";
import optipng from "imagemin-optipng";
import pngquant from "imagemin-pngquant";

export default ({ bundle, imageminOptions, isLossy }) => {
	const loaders = [
		{
			loader: "url-loader",
			options: {
				fallback: "file-loader",
				// limit image size to 18kb
				limit: 18000,
				// output images path
				name: "images/[name].[hash:8].[ext]",
			},
		},
	];

	if (bundle.isForWeb && !bundle.isDevelopment) {
		const plugins = [gifsicle(imageminOptions.gifsicle)];

		if (isLossy) {
			plugins.push(
				mozjpeg(imageminOptions.mozjpeg),
				pngquant(imageminOptions.pngquant)
			);
		} else {
			plugins.push(
				jpegtran(imageminOptions.jpegtran),
				optipng(imageminOptions.optipng)
			);
		}

		loaders.push({
			loader: ImageminPlugin.loader,
			options: {
				bail: false,
				cache: bundle.cachePath,
				imageminOptions: { plugins },
			},
		});
	}

	return loaders;
};
