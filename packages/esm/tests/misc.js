const { test } = require("tap");
const transform = require("../source/transform.js");

test("parse rest / spread / destructuring", ({ end, doesNotThrow }) => {
	doesNotThrow(() => {
		transform(`
			const m = { foo: 1 };
			const x = { ...m, bar: 2 };
			const { foo, bar } = x

			function baz (...args) {
				const [foo, ...rest] = [1, 2, ...args];
			}
		`);
	});

	end();
});
