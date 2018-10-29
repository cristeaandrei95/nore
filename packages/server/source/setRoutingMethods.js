const methods = ["get", "head", "post", "put", "delete", "options", "patch"];

export default server => {
	// set HTTP route handling methods
	for (const method of methods) {
		server[method] = (path, options, handler) => {
			server.fastify[method](path, options, handler);
		};
	}

	server.route = options => {
		server.fastify.route(options);
	};
};
