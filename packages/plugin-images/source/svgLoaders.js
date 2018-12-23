import ImageminPlugin from "imagemin-webpack";
import svgo from "imagemin-svgo";

export default ({ bundle, imageminOptions }) => {
	const loaders = [
		{
			loader: "url-loader",
			options: {
				fallback: "file-loader",
				mimetype: "image/svg+xml",
				// limit image size to 10kb
				limit: 10000,
				// output images path
				name: "images/[name].[hash:8].[ext]",
			},
		},
	];

	if (bundle.isForWeb && !bundle.isDevelopment) {
		loaders.push({
			loader: ImageminPlugin.loader,
			options: {
				bail: false,
				cache: bundle.cachePath,
				imageminOptions: {
					plugins: [svgo(imageminOptions.svgo)],
				},
			},
		});
	}

	return loaders;
};
