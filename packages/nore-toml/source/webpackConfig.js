export default bundle => {
	return {
		module: {
			rules: [
				{
					test: /\.toml$/,
					use: `${__dirname}/loader.js`,
				},
			],
		},
	};
};
