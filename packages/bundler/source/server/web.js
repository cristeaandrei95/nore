import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHMR from "webpack-hot-client";
import serve from "serve-handler";
import { Server } from "http";
import { isFile } from "@nore/std/fs";
import { parse } from "@nore/std/url";
import { join } from "@nore/std/path";

let port = 7000;

export default async bundle => {
	const compiler = await bundle.compiler();
	const options = compiler.options;
	const server = new Server();

	console.log(`server:web [started] http://localhost:${port}`);

	server.on("request", async (request, response) => {
		const url = parse(request.url);
		const file = join(bundle.sourcePath, "static", url.pathname);

		if (await isFile(file)) {
			await serve(request, response, { public: `${bundle.sourcePath}/static` });
		} else {
			handleDevMiddleware(request, response);
		}
	});

	server.listen(port++);

	const hmr = WebpackHMR(compiler, {
		server,
		stats: { context: options.context },
		reload: bundle.isDebug ? false : true,
		logLevel: bundle.isDebug ? "warn" : "info",
	});

	hmr.server.on("listening", () => {
		console.log(`server:web [HMR] listening...`);
	});

	const devMiddleware = WebpackDevMiddleware(compiler, {
		publicPath: options.output.publicPath,
		stats: { context: options.context },
		logLevel: bundle.isDebug ? "warn" : "silent",
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
	bundle.on("variables", async variables => {
		console.log(`watch:variables [change] "${event.path}"`);

		// rebundle the code
		devMiddleware.invalidate();
	});
};
