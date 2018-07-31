import multipart from "fastify-multipart";
import accepts from "fastify-accepts";
import cookie from "fastify-cookie";
import jwt from "fastify-jwt";
import helmet from "fastify-helmet";
import boom from "boom";
import qs from "qs";
import cuid from "cuid";
import sessions from "./sessions.js";
import templates from "./templates.js";
import MemoryStore from "./MemoryStore.js";

const defaults = {
	store: new MemoryStore(),
	secret: `${cuid()}|${cuid()}`,
};

export default (server, config) => {
	const { path, http, isDebug } = server;
	const store = config.store || defaults.store;
	const secret = config.secret || defaults.secret;

	function onError(error) {
		http.log.error("HTTP PLUGIN ERROR", error);
	}

	http.register(helmet);
	http.register(accepts, onError);
	http.register(cookie, onError);
	http.register(sessions, { secret, store });
	http.register(jwt, { secret });
	http.register(multipart);
	http.register(templates, { path, isDebug, templates: config.templates });

	// add support for qs parser
	http.decorateRequest("parseQuery", function() {
		const [path, query] = this.raw.url.split("?");

		return qs.parse(query);
	});

	// add support for boom errors generic error handling
	http.decorateReply("success", data => Object.assign({ success: 1 }, data));
	http.decorateReply("error", error => ({ error }));
	http.decorate("error", boom);
};
