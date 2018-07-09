const client = {
	config: {
		// https://goo.gl/fvQ293
		browserslist: ">0.25%, IE >= 10, Safari >= 10, not op_mini all",
	},

	options: {
		handle: "client",
		target: "web",
		source: "source",
		output: ".builds/client",
		webpack: "webpack.client.js",
	},
};

const server = {
	config: {
		// on node builds, use the latest features
		browserslist: ">5%",
		http: {
			port: 3000,
		},
	},

	options: {
		handle: "server",
		target: "node",
		source: "source",
		output: ".builds/server",
		webpack: "webpack.server.js",
	},
};

export default [client, server];
