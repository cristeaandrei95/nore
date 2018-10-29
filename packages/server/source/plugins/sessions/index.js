import plugin from "fastify-plugin";
import { sign, unsign } from "cookie-signature";
import cuid from "cuid";
import { merge } from "@nore/std/object";

const defaults = {
	secret: null,
	cookieName: "SID",
	maxAge: 1000 * 60 * 60 * 24, // 24 hours
	cookie: {
		path: "/",
		httpOnly: true,
		secure: undefined,
		sameSite: undefined,
		domain: undefined,
		expires: undefined,
	},
};

export default plugin(async (fastify, options = {}) => {
	const config = merge(defaults, options);

	if (!config.secret) {
		throw Error(`options.secret is required`);
	}
	// https://security.stackexchange.com/a/96176/38214
	if (config.secret.length < 32) {
		throw Error(`options.secret must have at least 32 characters`);
	}

	const { cookieName, secret, store } = config;

	fastify.addHook("preHandler", async (request, reply) => {
		const signedId = request.cookies[cookieName];

		// if no cookie, start a new session
		if (!signedId) {
			request.sessionId = cuid();
			request.session = {};
		} else {
			const sessionId = unsign(signedId, secret);

			// invalid session ID
			if (!sessionId) {
				request.sessionId = cuid();
				request.session = {};
			} else {
				const session = await store.get(sessionId);

				if (session) {
					request.sessionId = sessionId;
					request.session = await store.get(sessionId);
				} else {
					// session expired or no longer in the DB
					request.sessionId = cuid();
					request.session = {};
				}
			}
		}
	});

	fastify.addHook("onSend", async (request, reply, payload) => {
		// destroy the session if null
		if (request.session === null) {
			await store.remove(request.sessionId);
		} else {
			const signedId = sign(request.sessionId, secret);

			const cookieSettings = {
				...config.cookie,
				expires: Date.now() + config.maxAge,
			};

			reply.setCookie(cookieName, signedId, cookieSettings);

			await store.set(
				request.sessionId,
				request.session,
				cookieSettings.expires
			);
		}
	});

	fastify.decorateRequest("session", {});
});
