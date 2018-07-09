import imagemin from "./imagemin.js";

export default ({ bundle, isLossless }) => {
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
		loaders.push(imagemin(bundle, isLossless));
	}

	return loaders;
};
