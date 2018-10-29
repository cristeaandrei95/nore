import fastify from "fastify";
import cors from "access-control";
import { isString } from "@nore/std/assert";
import setPlugins from "./plugins";
import setRoutingMethods from "./setRoutingMethods.js";
import onNextEventLoop from "./onNextEventLoop.js";

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

		this.fastify.setErrorHandler(this.onHTTPError.bind(this));

		// set up fastify plugins
		setPlugins(this, options);
		// set methods to handle HTTP routing
		setRoutingMethods(this);
	}

	cors(path, options) {
		if (isString(path)) {
			this.fastify.use(path, cors(options));
		} else {
			this.fastify.use(cors(options));
		}
	}

	async start() {
		const { port, host } = this;

		// start on next event loop so we have time to hook everyting up
		return onNextEventLoop((resolve, reject) => {
			this.fastify.listen(port, host, (error, address) => {
				if (error) reject(error);
				else resolve(`${host}:${port}`);
			});
		});
	}

	serve(path, options = {}) {
		this.fastify.serve({
			root: path,
			send: options,
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
