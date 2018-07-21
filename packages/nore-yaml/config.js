export default bundle => {
	return {
		module: {
			rules: [
				{
					test: /\.ya?ml$/,
					use: `${__dirname}/loader.js`,
				},
			],
		},
	};
};
