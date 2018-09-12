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
	const { config, source, isProduction } = options;

	function setScriptTag(file) {
		return `<script src="${join(publicPath, file)}"></script>`;
	}

	function setStyleTag(file) {
		return `<link rel="stylesheet" href="${join(publicPath, file)}"/>`;
	}

	if (!isProduction) {
		files.js.unshift(`https://cdn.polyfill.io/v1/polyfill.min.js`);
	}

	const data = {
		title: config.title,
		scripts: files.js.map(setScriptTag).join("\n"),
		styles: files.css.map(setStyleTag).join("\n"),
		webpack_runtime: files.runtime,
		state: "is_loading",
		// TODO: is this still relevant?
		content: "<!-- content -->",
	};

	const template = join(source, "index.html");

	return render(template, data);
}
