import webpack from "webpack-dev-middleware";
import HMR from "webpack-hot-client";
import { Server } from "http";

export default (bundle, { port }) => {
	const webpackConfig = bundle.compiler.options;
	const server = new Server();

	server.listen(port);

	const hmr = HMR(bundle.compiler, {
		server,
		stats: { context: webpackConfig.context },
		logLevel: "silent",
		logTime: true,
		validTargets: [webpackConfig.target],
	});

	const middleware = webpack(bundle.compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: { context: webpackConfig.context },
		writeToDisk: true,
		logLevel: "info",
		logTime: true,
	});

	const onRequest = (request, response) => {
		middleware(request, response, error => {
			if (error) {
				response.end(`WEBPACK ERROR: ${error.toString()}`);
			} else if (!response.finished) {
				request.url = "/";
				onRequest(request, response);
			}
		});
	};

	server.on("request", (request, response) => {
		// ignore favicon
		if (request.url === "/favicon.ico") {
			response.end();
		} else {
			onRequest(request, response);
		}
	});

	hmr.server.on("listening", () => {
		console.log("websocket active");
	});
};
