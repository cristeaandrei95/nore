import devMiddleware from "webpack-dev-middleware";
import HMR from "webpack-hot-client";
import serve from "serve-handler";
import { Server } from "http";
import { isFile } from "@nore/std/fs";
import { parse } from "@nore/std/url";
import { join } from "@nore/std/path";
import log from "../util/log.js";

export default (bundle, { port }) => {
	const webpackConfig = bundle.compiler.options;
	const server = new Server();

	server.on("request", async (request, response) => {
		const url = parse(request.url);
		const file = join(bundle.source, "static", url.pathname);

		if (await isFile(file)) {
			await serve(request, response, { public: "source/static" });
		} else {
			onMiddleware(request, response);
		}
	});

	server.listen(port);

	log(`server:web [started] http://localhost:${port}`);

	const hmr = HMR(bundle.compiler, {
		server,
		stats: { context: webpackConfig.context },
		logLevel: "warn",
		logTime: true,
	});

	hmr.server.on("listening", () => {
		log(`server:web [HMR] listening...`);
	});

	const middleware = devMiddleware(bundle.compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: { context: webpackConfig.context },
		writeToDisk: true,
		logLevel: "info",
		logTime: true,
	});

	function onMiddleware(request, response) {
		middleware(request, response, error => {
			if (error) {
				response.end(`WEBPACK ERROR: ${error.toString()}`);
			} else if (!response.finished) {
				request.url = "/";
				onMiddleware(request, response);
			}
		});
	}
};
