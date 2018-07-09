const { parse } = require("acorn");

const isArray = Array.isArray;
const getKeys = Object.keys;
const cwd = process.env.PROJECT_PATH || process.cwd();

function setRequirePath(request) {
	if (request.charAt(0) === "~") {
		return request.replace("~", cwd);
	} else {
		return request;
	}
}

function traverse(node, handler) {
	if (!node || !node.type) return;

	handler(node);

	const keys = getKeys(node);

	for (let n = 0; n < keys.length; ++n) {
		const key = keys[n];
		const value = node[key];

		if (isArray(value)) {
			for (let n = 0; n < value.length; ++n) {
				traverse(value[n], handler);
			}
		} else if (value && value.type) {
			traverse(value, handler);
		}
	}
}

function onImportDeclaration(node, fmtName) {
	let patch = "";

	// import from 'foo'
	if (!node.specifiers.length) {
		patch = `require("${setRequirePath(node.source.value)}");`;
	} else {
		const module = fmtName(node.source.value);
		const require = `require("${setRequirePath(node.source.value)}")`;

		patch += `const ${module} = ${require}`;

		node.specifiers.forEach((node, index) => {
			const { name } = node.local;

			switch (node.type) {
				// import { foo } from 'bar'
				case "ImportSpecifier":
					patch += `, ${name} = ${module}.${node.imported.name}`;
					break;

				// import foo from 'bar'
				case "ImportDefaultSpecifier":
					patch += `, ${name} = (${module}.default || ${module})`;
					break;

				// import * as foo from 'bar'
				case "ImportNamespaceSpecifier":
					patch += `, ${name} = ${module}`;
					break;
			}
		});

		patch += ";";
	}

	return {
		patch,
		start: node.start,
		end: node.end,
	};
}

function onExportNamedDeclaration(node, source, fmtName) {
	let patch = "";

	// export { foo } from "bar"
	if (node.source) {
		const module = fmtName(node.source.value);
		const exports = [
			`const ${module} = require("${setRequirePath(node.source.value)}");`,
		];

		node.specifiers.forEach(node => {
			const exported = node.exported.name;
			const name = node.local.name;

			exports.push(`exports.${exported} = ${module}.${name};`);
		});

		patch += exports.join(" ");
	}
	// export { foo, biz as baz } from "bar"
	else if (node.specifiers.length) {
		const exports = [];

		node.specifiers.forEach(({ local, exported }) => {
			exports.push(`exports.${exported.name} = ${local.name};`);
		});

		patch += exports.join(" ");
	}
	// export var foo = 1
	else if (node.declaration) {
		const { declaration } = node;

		if (declaration.type == "VariableDeclaration") {
			const exports = [];

			declaration.declarations.forEach(({ id, init }) => {
				const code = source.substring(init.start, init.end);
				const name = id.name;

				exports.push(`${name} = exports.${name} = ${code}`);
			});

			patch += `const ${exports.join(", ")};`;
		}
		// export function foo () {}
		else if (declaration.type == "FunctionDeclaration") {
			const code = source.substring(declaration.start, declaration.end);
			const { name } = declaration.id;

			patch += `${code}; exports.${name} = ${name};`;
		}
		// export class Foo {}
		else {
			const code = source.substring(declaration.start, declaration.end);
			const { name } = declaration.id;

			patch += `exports.${name} = ${code};`;
		}
	}

	return {
		patch,
		start: node.start,
		end: node.end,
	};
}

function onExportDefaultDeclaration(node, source, fmtName) {
	const { type, start, end, id } = node.declaration;
	const code = source.substring(start, end);

	const patch = id
		? `${code}; exports.default = ${id.name};`
		: `exports.default = ${code};`;

	return {
		patch,
		start: node.start,
		end: node.end,
	};
}

function onExportAllDeclaration(node, source, fmtName) {
	const module = fmtName(node.source.value);

	let patch = `
    const ${module} = require("${setRequirePath(node.source.value)}");

    Object.keys(${module}).forEach((key) => {
      exports[key] = ${module}[key]
    });
  `;

	return {
		patch,
		start: node.start,
		end: node.end,
	};
}

function fmtPrefix(name) {
	const cache = new Map();

	return function fmtName() {};
	return "__" + name.replace(/\W+/g, "_") + "__";
}

function getNameGenerator() {
	const cache = {};

	return function fmtName(request) {
		let name = request.replace(/\W+/g, "_");

		if (cache[name] === undefined) {
			cache[name] = 0;
		}

		if (cache[name]) {
			name += cache[name];
		}

		cache[name] += 1;

		return `__${name}__`;
	};
}

module.exports = source => {
	const fmtName = getNameGenerator();
	const patches = [];

	const ast = parse(source, {
		ecmaVersion: 8,
		sourceType: "module",
		allowHashBang: true,
		allowReturnOutsideFunction: true,
	});

	traverse(ast, node => {
		switch (node.type) {
			case "ImportDeclaration":
				patches.push(onImportDeclaration(node, fmtName));
				break;

			case "ExportDefaultDeclaration":
				patches.push(onExportDefaultDeclaration(node, source, fmtName));
				break;

			case "ExportNamedDeclaration":
				patches.push(onExportNamedDeclaration(node, source, fmtName));
				break;

			case "ExportAllDeclaration":
				patches.push(onExportAllDeclaration(node, source, fmtName));
				break;
		}
	});

	let n = patches.length;

	while (n--) {
		const { start, end, patch } = patches[n];
		const before = source.substring(0, start);
		const after = source.substring(end, source.length);

		source = before + patch + after;
	}

	return source;
};
