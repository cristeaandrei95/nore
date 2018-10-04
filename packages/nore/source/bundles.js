const client = {
	config: {
		// https://goo.gl/fvQ293
		browserslist: ">0.25%, IE >= 10, Safari >= 10, not op_mini all",
	},

	bundle: {
		handle: "client",
		target: "web",
	},
};

const server = {
	config: {
		// use Chrome 60 to match node 10's V8 version
		browserslist: "chrome 60",
		http: {
			port: 3000,
		},
	},

	bundle: {
		handle: "server",
		target: "node",
	},
};

export default [client];
