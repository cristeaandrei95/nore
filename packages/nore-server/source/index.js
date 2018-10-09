import fastify from "fastify";
import cors from "access-control";
import { isString } from "@nore/std/assert";
import setPlugins from "./plugins.js";
import onNextEventLoop from "./onNextEventLoop.js";

const methods = ["get", "head", "post", "put", "delete", "options", "patch"];

export default class Server {
	constructor(options = {}) {
		// setup options
		this.path = options.path || process.cwd();
		this.port = options.port || 5000;
		this.host = options.host || "localhost";
		this.isDebug = options.isDebug || true;

		this.fastify = fastify({
			logger: options.logger || true,
			ignoreTrailingSlash: true,
			defaultRoute: options.onNotFound,
			caseSensitive: options.caseSensitive || false,
		});

		// set up fastify & plugins
		setPlugins(this, {
			templates: options.templates,
			store: options.store,
			secret: options.secret,
		});

		this.fastify.setErrorHandler(this.onHTTPError.bind(this));

		// set HTTP route handling methods
		for (const method of methods) {
			this[method] = (path, options, handler) => {
				this.fastify[method](path, options, handler);
			};
		}
	}

	route(options) {
		this.fastify.route(options);
	}

	cors(path, options) {
		if (isString(path)) {
			this.fastify.use(path, cors(options));
		} else {
			this.fastify.use(cors(options));
		}
	}

	async start() {
		const { fastify, port, host } = this;

		// start on next event loop so we have time to hook everyting up
		return onNextEventLoop((resolve, reject) => {
			fastify.listen(port, host, (error, address) => {
				if (error) reject(error);
				else resolve(`${host}:${port}`);
			});
		});
	}

	onHTTPError(error, request, reply) {
		if (error && error.isBoom) {
			reply
				.code(error.output.statusCode)
				.type("application/json")
				.headers(error.output.headers)
				.send(error.output.payload);
		} else {
			reply.send(error || new Error("Server error: " + error));
		}

		if (this.isDebug) {
			// ignore not found
			if (error.message === "Not found") return;

			this.fastify.log.error("HTTP ERROR", error);
		}
	}
}
