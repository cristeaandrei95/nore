const { readFileSync } = require("fs");
const transform = require("./transform.js");
const onError = require("./onError.js");

const cache = new Map();
const extensions = [".js", ".mjs"];

const nodeLoader = require.extensions[".js"];

function load(module, file) {
	if (file.includes("node_modules")) {
		return nodeLoader(module, file);
	}

	let source = cache.get(file);

	if (!source) {
		source = readFileSync(file, "utf8");

		if (source.includes("import ") || source.includes("export ")) {
			// transform ES Modules format to CommonJS
			try {
				source = transform(source);
			} catch (error) {
				onError({ file, error });
				process.exit(1);
			}
		}

		cache.set(file, source);
	}

	module._compile(source, file);
}

// set new file extension handlers
extensions.forEach(type => {
	require.extensions[type] = load;
});
