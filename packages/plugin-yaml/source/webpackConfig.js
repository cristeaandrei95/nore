export default async bundle => {
	const rule = {
		test: /\.yaml$/,
		use: `${__dirname}/loader.js`,
	};

	return {
		module: {
			rules: [rule],
		},
	};
};
