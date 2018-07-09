const { test } = require("tap");
const { resolve } = require("path");
const { exec } = require("child_process");
const es = `${resolve(__dirname, "..")}/source/cli.js`;
const samples = `${__dirname}/samples`;

test("imports and exports", ({ end, equal }) => {
	const cmd = `${es} ${samples}/index.js`;

	exec(cmd, (error, stdout, stderr) => {
		if (error) throw error;
		if (stderr) throw stderr;

		equal(stdout, "valid\n");
		end();
	});
});

test("es: missing file", ({ end, ok }) => {
	exec(es, (error, stdout, stderr) => {
		ok(stderr.includes("specify a file"));
		end();
	});
});

// TODO: fix `esm/register` test
// test("es/register", ({ end, equal }) => {
// 	const cmd = `${es} ${samples}/register.js`;

// 	exec(cmd, (error, stdout, stderr) => {
// 		if (error) throw error;
// 		if (stderr) throw stderr;

// 		equal(stdout, "../../..\n");
// 		end();
// 	});
// });
