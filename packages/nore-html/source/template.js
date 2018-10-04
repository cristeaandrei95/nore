import { readFileSync } from "fs";
import { join } from "path";

function render(file, data) {
	const fields = Object.keys(data).join(",");
	const content = readFileSync(file, "utf8");
	const template = new Function(`{${fields}}`, `return \`${content}\``);

	return template(data);
}

export default function({ htmlWebpackPlugin, webpackConfig }) {
	const { files, options } = htmlWebpackPlugin;
	const { publicPath } = webpackConfig.output;
	const { config, source, isDevelopment } = options;

	function setScriptTag(file) {
		return `<script src="${join(publicPath, file)}"></script>`;
	}

	function setStyleTag(file) {
		return `<link rel="stylesheet" href="${join(publicPath, file)}"/>`;
	}

	const data = {
		isDevelopment,
		title: config.title,

		head: {
			scripts: "",
			styles: files.css.map(setStyleTag).join("\n"),
			runtime: files.runtime || "",
		},

		body: {
			styles: "",
			scripts: files.js.map(setScriptTag).join("\n"),
		},
	};

	const template = join(source, "index.html");

	return render(template, data);
}
