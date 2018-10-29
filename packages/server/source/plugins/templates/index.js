import { Environment, FileSystemLoader } from "nunjucks";
import plugin from "fastify-plugin";

function fmtRequest(request) {
	return request.includes(".html") ? request : `${request}.html`;
}

export default plugin(async (fastify, options = {}) => {
	const loader = new FileSystemLoader(options.paths || "templates", {
		watch: options.watch,
		noCache: options.noCache || options.isDebug,
	});
	const engine = new Environment(loader);

	fastify.decorateReply("render", function(template, data = {}) {
		if (!template) {
			return this.send(new Error("Template path is not defined."));
		}

		engine.render(fmtRequest(template), data, (error, html) => {
			if (error) return this.send(error);

			this.header("Content-Type", "text/html; charset=utf-8");
			this.send(html);
		});
	});
});
