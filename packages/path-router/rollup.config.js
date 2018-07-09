export default {
	input: "./source/index.js",
	output: {
		file: "dist/cjs.js",
		format: "cjs",
		exports: "named",
		outro: "exports.Router = Router",
		sourcemap: true,
	},
};
