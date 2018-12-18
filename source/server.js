import { Server } from "http";
import { readFile } from "@nore/std/fs";
import { render } from "@nore/pwa";
import views from "~/views";
import $ from "~/styles";

const cwd = process.cwd();
const server = new Server();

server.on("request", async (request, response) => {
	const template = await readFile(`${cwd}/.builds/client/index.html`);

	const page = {
		title: "Navaru",
		path: "/design",
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

	response.setHeader("content-type", "text/html");
	response.end(html);
});

server.listen(5000);

console.log("started server code");
