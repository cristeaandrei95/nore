import rateLimiter from "fastify-rate-limit";
import multipart from "fastify-multipart";
import serveFiles from "fastify-static";
import accepts from "fastify-accepts";
import cookie from "fastify-cookie";
import helmet from "fastify-helmet";
import jwt from "fastify-jwt";
import boom from "boom";
import cuid from "cuid";
import qs from "qs";
import { merge } from "@nore/std/object";
import * as url from "@nore/std/url";
import sessions from "./sessions.js";
import templates from "./templates.js";
import MemoryStore from "./MemoryStore.js";

const defaults = {
	store: new MemoryStore(),
	secret: `${cuid()}|${cuid()}`,
};

export default (server, options = {}) => {
	const { path, fastify, isDebug } = server;
	const config = merge(defaults, options);

	function onError(error) {
		fastify.log.error("HTTP PLUGIN ERROR", error);
	}

	fastify.register(templates, { path, isDebug, templates: config.templates });
	fastify.register(accepts, onError);
	fastify.register(cookie, onError);
	fastify.register(multipart);

	fastify.register(sessions, {
		secret: config.secret,
		store: config.store,
	});

	// TODO: set helmet config
	fastify.register(helmet);
	fastify.register(jwt, { secret: config.secret });

	fastify.register(rateLimiter, {
		max: 120,
		timeWindow: "1 minute",
		cache: 1000,
		keyGenerator: req =>
			req.headers["x-real-ip"] || // nginx
			req.headers["x-client-ip"] || // apache
			req.ip,
	});

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
