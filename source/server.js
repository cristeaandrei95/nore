import { createReadStream } from "fs";
import { Server } from "http";
import React, { Component } from "react";
import { renderToString } from "react-dom/server";
import { getLoadableState } from "loadable-components/server";
import { readFile, writeFile, isFile } from "@nore/std/fs";
import { parse } from "@nore/std/url";
import { join } from "@nore/std/path";
import { render, Application } from "@nore/pwa";
import views from "~/views";
import $ from "~/styles";

const cwd = process.cwd();
const clientBundlePath = `${cwd}/.builds/client`;

async function renderToHTML(page) {
	console.log("trying to render html");

	const application = render({
		state: page,
		children: views,
		class: $.application,
	});

	const content = renderToString(application);

	// const layout = await readFile(join(clientBundlePath, "index.html"));
	const loadableState = await getLoadableState(application);

	console.log(loadableState.tree ? loadableState.tree.children : loadableState);

	const html = `
    <!doctype html>
    <html>
    <head></head>
    <body>
      <div id="main">${content}</div>
      ${loadableState.getScriptTag()}
    </body>
    </html>
  `;

	// const html = layout
	// 	.replace("<title>undefined</title>", `<title>${page.title}</title>`)
	// 	.replace(`"is_loading"`, `"is_loaded"`)
	// 	.replace("<!-- content -->", content);

	return html;
}

const server = new Server();

server.on("request", async (request, response) => {
	const url = parse(request.url);
	const tryFile = join(clientBundlePath, url.pathname);

	if (await isFile(tryFile)) {
		createReadStream(tryFile).pipe(response);
	} else {
		const html = await renderToHTML({
			title: "Navaru",
			path: url.pathname,
			query: {},
		});

		response.end(html);
	}
});

process.on("exit", () => {
	server.close(() => {
		console.log("STOPPED: http://localhost:5000 ");
	});
});

server.listen(5000);

console.log("STARTED: http://localhost:5000");
