import { MemoryStore, randomString } from "../util";

export default server => ({
	templates: {
		paths: ["templates", "source/templates"],
		watch: true,
	},
	sessions: {
		secret: randomString(),
		store: new MemoryStore(),
		cookie: {
			path: "/",
			secure: true,
			httpOnly: true,
			sameSite: true,
			domain: null,
			expires: null,
		},
	},
	jwt: {
		secret: randomString(),
	},
	rateLimiter: {
		// limit to 4 requests per second
		max: 4,
		timeWindow: 1000,
		cache: 5000,
		keyGenerator: req =>
			req.headers["x-real-ip"] || // nginx
			req.headers["x-client-ip"] || // apache
			req.ip,
	},
	multipart: {},
	helmet: {},
});
