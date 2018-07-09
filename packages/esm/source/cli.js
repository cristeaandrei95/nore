#!/usr/bin/env node
const { resolve } = require("path");
const pkg = require("../package.json");
const { argv } = process;

if (argv.includes("-v") || argv.includes("--version")) {
	console.log(pkg.version);
} else {
	const node = argv.shift();
	const bin = argv.shift();

	let file = argv.shift();

	if (!file) {
		console.error("es: please specify a file path to run");
	} else {
		while (file.includes("--")) {
			file = argv.shift();
		}

		argv.unshift(file);
		argv.unshift(node);

		// inject compiler: ES -> CommonJS
		require("./register.js");
		// load file
		require(resolve(file));
	}
}
