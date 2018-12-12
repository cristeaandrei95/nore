import crypto from "crypto";
import { getDirectory, getFileName } from "@nore/std/path";

function getFileNameWithoutExtension(path) {
	const segments = getFileName(path).split(".");

	// remove extension
	segments.pop();

	return segments.join(".");
}

function isMainFile(fileName) {
	return ["style", "index"].includes(fileName);
}

function getComponentName(path) {
	const fileName = getFileNameWithoutExtension(path);
	const directory = getDirectory(path);
	const parent = directory.split("/").pop();

	return isMainFile(fileName) ? parent : fileName;
}

function genSuffix(data) {
	return crypto
		.createHash("md5")
		.update(data)
		.digest("hex")
		.substr(-6);
}

export default (loaderContext, localIdentName, localName, options) => {
	const file = loaderContext.resourcePath;
	const componentName = getComponentName(file).toLowerCase();
	const suffix = genSuffix(`${file}|${localName}`);

	return `${componentName}_${localName}_${suffix}`;
};
