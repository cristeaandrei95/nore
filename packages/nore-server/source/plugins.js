import multipart from "fastify-multipart";
import accepts from "fastify-accepts";
import cookie from "fastify-cookie";
import jwt from "fastify-jwt";
import helmet from "fastify-helmet";
import serveFiles from "fastify-static";
import boom from "boom";
import qs from "qs";
import cuid from "cuid";
import * as url from "@nore/std/url";
import sessions from "./sessions.js";
import templates from "./templates.js";
import MemoryStore from "./MemoryStore.js";

const defaults = {
	store: new MemoryStore(),
	secret: `${cuid()}|${cuid()}`,
};

export default (server, config) => {
	const { path, fastify, isDebug } = server;
	const store = config.store || defaults.store;
	const secret = config.secret || defaults.secret;

	function onError(error) {
		fastify.log.error("HTTP PLUGIN ERROR", error);
	}

	fastify.register(helmet);
	fastify.register(accepts, onError);
	fastify.register(cookie, onError);
	fastify.register(sessions, { secret, store });
	fastify.register(jwt, { secret });
	fastify.register(multipart);
	fastify.register(templates, { path, isDebug, templates: config.templates });

	// add support for qs parser
	fastify.decorateRequest("parseQuery", function() {
		const [path, query] = this.raw.url.split("?");

		return qs.parse(query);
	});

	// add support to parse the URL
	fastify.decorateRequest("parseURL", function() {
		return url.parse(this.raw.url);
	});

	// add support for statif file serving
	fastify.decorate("serve", options => {
		fastify.register(serveFiles, options);
	});

	// add support for boom errors generic error handling
	fastify.decorateReply("success", (data = {}) => ({ success: 1, ...data }));
	fastify.decorateReply("error", error => ({ error }));
	fastify.decorate("error", boom);
};
