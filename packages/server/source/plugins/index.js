import { merge } from "@nore/std/object";
import * as url from "@nore/std/url";
import rateLimiter from "fastify-rate-limit";
import multipart from "fastify-multipart";
import serveFiles from "fastify-static";
import accepts from "fastify-accepts";
import cookies from "fastify-cookie";
import helmet from "fastify-helmet";
import jwt from "fastify-jwt";
import boom from "boom";
import qs from "qs";
import sessions from "./sessions";
import templates from "./templates";
import defaults from "./defaults.js";

export default (server, options = {}) => {
	const { path, fastify, isDebug } = server;
	const config = merge(defaults(server), options);

	function onError(error) {
		fastify.log.error("HTTP PLUGIN ERROR", error);
	}

	fastify.register(rateLimiter, config.rateLimiter);
	fastify.register(accepts, onError);
	fastify.register(jwt, config.jwt);
	fastify.register(cookies, onError);
	fastify.register(sessions, config.sessions);
	fastify.register(templates, { isDebug, ...config.templates });
	fastify.register(helmet, config.helmet);
	fastify.register(multipart, config.multipart);

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
