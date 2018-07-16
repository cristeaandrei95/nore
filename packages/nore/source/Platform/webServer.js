import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHMR from "webpack-hot-client";
import serve from "serve-handler";
import { Server } from "http";
import { isFile } from "@nore/std/fs";
import { parse } from "@nore/std/url";
import { join } from "@nore/std/path";
import watchVariables from "./watchVariables";
import log from "../util/log.js";

export default ({ nore, bundle, port }) => {
	const webpackConfig = bundle.compiler.options;
	const server = new Server();

	server.on("request", async (request, response) => {
		const url = parse(request.url);
		const file = join(bundle.source, "static", url.pathname);

		if (await isFile(file)) {
			await serve(request, response, { public: "source/static" });
		} else {
			handleDevMiddleware(request, response);
		}
	});

	server.listen(port);

	log(`server:web [started] http://localhost:${port}`);

	const hmr = WebpackHMR(bundle.compiler, {
		server,
		reload: false,
		stats: { context: webpackConfig.context },
		logLevel: "warn",
		logTime: true,
	});

	hmr.server.on("listening", () => {
		log(`server:web [HMR] listening...`);
	});

	const devMiddleware = WebpackDevMiddleware(bundle.compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: { context: webpackConfig.context },
		logLevel: "warn",
		logTime: true,
		writeToDisk: true,
	});

	function handleDevMiddleware(request, response) {
		devMiddleware(request, response, error => {
			if (error) {
				response.end(`WEBPACK ERROR: ${error.toString()}`);
			} else if (!response.finished) {
				request.url = "/";
				handleDevMiddleware(request, response);
			}
		});
	}

	// watch variables for changes
	watchVariables(bundle.source, async event => {
		await nore.loadVariables();

		// rebundle the code
		devMiddleware.invalidate();
	});
};
