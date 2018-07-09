import { createHash } from "crypto";
import { basename, dirname, sep } from "path";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function hash(count) {
	let text = "";

	for (let i = 0; i < count; i++) {
		const position = Math.floor(Math.random() * chars.length);

		text += chars.charAt(position);
	}

	return text;
}

function getParentFolder(file) {
	return dirname(file)
		.split(sep)
		.pop();
}

function isMain(fileName) {
	return ["index", "style"].includes(fileName);
}

export default isDevelopment => (context, identity, name, options) => {
	const file = context.resourcePath;

	if (isDevelopment) {
		const fileName = basename(file, ".css");
		const prefix = isMain(fileName) ? getParentFolder(file) : fileName;

		return `${prefix}_${name}_${hash(5)}`.toLowerCase();
	} else {
		return "c" + hash(5);
	}
};
