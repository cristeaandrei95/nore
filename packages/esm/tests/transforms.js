const { test } = require("tap");
const transform = require("../source/transform.js");

test("ImportDeclaration", ({ end, same }) => {
	const input = 'import "bar"';
	const output = 'require("bar");';

	same(transform(input), output);
	end();
});

test("ImportDefaultSpecifier", ({ end, same }) => {
	const input = 'import foo from "bar"';
	const output =
		'const __bar__ = require("bar"), foo = (__bar__.default || __bar__);';

	same(transform(input), output);
	end();
});

test("ImportNamespaceSpecifier", ({ end, same }) => {
	const input = 'import * as foo from "bar"';
	const output = 'const __bar__ = require("bar"), foo = __bar__;';

	same(transform(input), output);
	end();
});

test("ImportSpecifier", ({ end, same }) => {
	const input = 'import { foo, baz } from "bar"';
	const output =
		'const __bar__ = require("bar"), foo = __bar__.foo, baz = __bar__.baz;';

	same(transform(input), output);
	end();
});

test("ImportSpecifier as", ({ end, same }) => {
	const input = 'import { foo as baz } from "bar"';
	const output = 'const __bar__ = require("bar"), baz = __bar__.foo;';

	same(transform(input), output);
	end();
});

test("ImportSpecifier mixed", ({ end, same }) => {
	const input = 'import { foo, baz as quux } from "bar"';
	const output =
		'const __bar__ = require("bar"), foo = __bar__.foo, quux = __bar__.baz;';

	same(transform(input), output);
	end();
});

test("ImportDefaultSpecifier and code", ({ end, same }) => {
	const input = 'import * as foo from "bar"\n"more code"';
	const output = 'const __bar__ = require("bar"), foo = __bar__;\n"more code"';

	same(transform(input), output);
	end();
});

test("import and export order", ({ end, same }) => {
	const input = 'import { join } from "path"\nexport default () => {}';
	const output =
		'const __path__ = require("path"), join = __path__.join;\nexports.default = () => {};';

	same(transform(input), output);
	end();
});

test("import npm namespaced modules", ({ end, same }) => {
	const input = 'import foo from "@bar/baz-arr"';
	const output =
		'const ___bar_baz_arr__ = require("@bar/baz-arr"), foo = (___bar_baz_arr__.default || ___bar_baz_arr__);';

	same(transform(input), output);
	end();
});

test("ExportNamedDeclaration function", ({ end, same }) => {
	const input = "export function bar () {}";
	const output = "function bar () {}; exports.bar = bar;";

	same(transform(input), output);
	end();
});

test("ExportNamedDeclaration class", ({ end, same }) => {
	const input = "export class baz {}";
	const output = "exports.baz = class baz {};";

	same(transform(input), output);
	end();
});

test("ExportNamedDeclaration VariableDeclaration single", ({ end, same }) => {
	const input = "export const foo = 1";
	const output = "const foo = exports.foo = 1;";

	same(transform(input), output);
	end();
});

test("ExportNamedDeclaration VariableDeclaration multiple", ({ end, same }) => {
	const input = "export const foo = 1, bar = 2";
	const output = "const foo = exports.foo = 1, bar = exports.bar = 2;";

	same(transform(input), output);
	end();
});

test("ExportNamedDeclaration simple", ({ end, same }) => {
	const input = "export { foo, bar }";
	const output = "exports.foo = foo; exports.bar = bar;";

	same(transform(input), output);
	end();
});

test("ExportNamedDeclaration mixed", ({ end, same }) => {
	const input = "export { foo, bar as baz }";
	const output = "exports.foo = foo; exports.baz = bar;";

	same(transform(input), output);
	end();
});

test("ExportNamedDeclaration", ({ end, same }) => {
	const input = 'export { foo, bar as baz } from "baz"';
	const output =
		'const __baz__ = require("baz"); exports.foo = __baz__.foo; exports.baz = __baz__.bar;';

	same(transform(input), output);
	end();
});

test("ExportDefaultDeclaration function", ({ end, same }) => {
	const input = "export default function bar () {}";
	const output = "function bar () {}; exports.default = bar;";

	same(transform(input), output);
	end();
});

test("ExportDefaultDeclaration object", ({ end, same }) => {
	const input = "export default { foo: 1 }";
	const output = "exports.default = { foo: 1 };";

	same(transform(input), output);
	end();
});
