export default bundle => {
	const config = {
		// basic
		gifsicle: {
			interlaced: true,
		},
		svgo: {
			removeTitle: true,
			removeDimensions: true,
			removeViewBox: false,
			convertPathData: false,
		},
		// lossless
		jpegtran: {
			progressive: true,
		},
		optipng: {
			optimizationLevel: 5,
		},
		// lossy
		mozjpeg: {
			progressive: true,
			arithmetic: false,
		},
		pngquant: {},
	};

	// TODO: load external config: config/[handle].imagemin.js

	return config;
};
