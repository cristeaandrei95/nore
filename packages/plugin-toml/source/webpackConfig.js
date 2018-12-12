export default bundle => {
	const rule = {
		test: /\.toml$/,
		use: `${__dirname}/loader.js`,
	};

	return {
		module: {
			rules: [rule],
		},
	};
};
