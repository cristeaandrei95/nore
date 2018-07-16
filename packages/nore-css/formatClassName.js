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

function isMain(fileName) {
	return ["index", "style"].includes(fileName);
}

function getAncestor(file, n) {
	const segments = dirname(file).split(sep);
	const match = segments.splice(segments.length - n, 1);

	return match.pop();
}

export default isDevelopment => (context, identity, className, options) => {
	const file = context.resourcePath;

	if (isDevelopment) {
		const fileName = basename(file, ".css");
		const folder = getAncestor(file, 2);
		const component = isMain(fileName) ? getAncestor(file, 1) : fileName;
		const id = `${folder}_${component}_${className}`.toLowerCase();

		return id;
	} else {
		return "c" + hash(5);
	}
};
