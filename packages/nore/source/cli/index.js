#!/usr/bin/env node
require("@nore/esm/register");
require("../util/onUnhandledErrors");

const { itExists } = require("@nore/std/fs");
const getopts = require("getopts");

const alias = {
	help: ["h"],
	mode: ["m"],
	path: ["p"],
	debug: ["d"],
};

const cli = getopts(process.argv.slice(2), { alias });
const command = cli._[0] || "help";
const file = `${__dirname}/${command}.js`;

const commandNotFound = `
    ERROR: "${command}" is not a valid command.
`;

itExists(file).then(isFile => {
	if (isFile) {
		require(file).default(cli);
	} else {
		console.error(commandNotFound);
		require("./help").default();
	}
});
