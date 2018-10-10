import Server from "@nore/server";
import { readFile } from "@nore/std/fs";
import { render } from "@nore/pwa";
import views from "~/views";
import $ from "~/styles";

const cwd = process.cwd();
const server = new Server();

server.get("/", async (request, reply) => {
	const template = await readFile(`${cwd}/.builds/client/index.html`);
	const url = request.parseURL();

	const page = {
		title: "Navaru",
		path: url.pathname,
		query: {},
	};

	const application = render({
		state: page,
		children: views,
		class: $.application,
	});

	const html = template
		.replace("<!-- title -->", page.title)
		.replace("<!-- content -->", application.html)
		.replace(`"is_loading"`, `"is_loaded"`);

	reply.type("text/html");
	reply.send(html);
});

server.serve(`${cwd}/.builds/client`);

server.start().then(url => {
	console.log(`Listening on ${url}`);
});
