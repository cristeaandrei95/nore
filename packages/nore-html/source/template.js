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

	const scripts = files.js.map(file => {
		const path = join(publicPath, file.path);

		return `<script src="${path}"></script>`;
	});

	const styles = files.css.map(file => {
		const path = join(publicPath, file.path);

		return `<link rel="stylesheet" href="${path}"/>`;
	});

	if (isProduction) {
		scripts.unshift(
			`<script src="https://cdn.polyfill.io/v1/polyfill.min.js"></script>`
		);
	}

	const data = {
		state: "is_loading",
		scripts: scripts.join("\n"),
		styles: styles.join("\n"),
		content: ``,
		title: config.title,
	};

	const template = join(source, "template.html");

	return render(template, data);
}
