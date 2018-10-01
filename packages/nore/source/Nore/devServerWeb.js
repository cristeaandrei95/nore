import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHMR from "webpack-hot-client";
import serve from "serve-handler";
import { Server } from "http";
import { isFile } from "@nore/std/fs";
import { parse } from "@nore/std/url";
import { join } from "@nore/std/path";

export default async ({ nore, bundle, port }) => {
	const log = nore.log.child({ service: `node:server:${bundle.handle}` });
	const compiler = await bundle.compiler();
	const webpackConfig = compiler.options;
	const server = new Server();

	server.on("request", async (request, response) => {
		const url = parse(request.url);
		const file = join(bundle.source, "static", url.pathname);

		if (await isFile(file)) {
			await serve(request, response, { public: `${bundle.source}/static` });
		} else {
			handleDevMiddleware(request, response);
		}
	});

	server.listen(port);

	log.info(`server:web [started] http://localhost:${port}`);

	const hmr = WebpackHMR(compiler, {
		server,
		reload: nore.isDebug ? false : true,
		stats: { context: webpackConfig.context },
		logLevel: bundle.isDebug ? "error" : "silent",
	});

	hmr.server.on("listening", () => {
		log.info(`server:web [HMR] listening...`);
	});

	const devMiddleware = WebpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: { context: webpackConfig.context },
		logLevel: bundle.isDebug ? "error" : "silent",
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
	nore.on("variables:change", async (variables, event) => {
		log.info(`watch:variables [change] "${event.path}"`);

		// rebundle the code
		setTimeout(() => {
			devMiddleware.invalidate();
		}, 100);
	});
};
