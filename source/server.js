import { createReadStream } from "fs";
import { Server } from "http";
import React, { Component } from "react";
import { renderToString } from "react-dom/server";
import { getLoadableState } from "loadable-components/server";
import { readFile, writeFile, isFile } from "@nore/std/fs";
import { parse } from "@nore/std/url";
import { join } from "@nore/std/path";
import { Application } from "nore";
import Pages from "~/pages";

const cwd = process.cwd();
const build = `${cwd}/public/build`;

async function render(page) {
	const application = (
		<Application state={page}>
			<Pages />
		</Application>
	);

	const cwd = process.cwd();
	const layout = await readFile(`${build}/index.html`);
	const loadable = await getLoadableState(application);
	const content = renderToString(application);

	const html = layout
		.replace("<title>undefined</title>", `<title>${page.title}</title>`)
		.replace(`"is_loading"`, `"is_loaded"`)
		.replace("<!-- content -->", content);

	return html;
}

const server = new Server();

server.on("request", async (request, response) => {
	const url = parse(request.url);
	const tryFile = join(build, url.pathname);

	if (await isFile(tryFile)) {
		createReadStream(tryFile).pipe(response);
	} else {
		const html = await render({
			title: "Navaru",
			path: url.pathname,
			query: {},
		});

		response.end(html);
	}
});

process.on("exit", () => {
	server.close(() => {
		console.log("STOPPED: http://localhost:7000 ");
	});
});

server.listen(7000);

console.log("STARTED: http://localhost:7000");
