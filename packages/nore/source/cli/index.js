#!/usr/bin/env node
require("@nore/esm/register");

const getopts = require("getopts");

const alias = {
	config: ["c"],
	mode: ["m"],
	path: ["p"],
	variables: ["v"],
	help: ["h"],
};

const cli = getopts(process.argv.slice(2), { alias });
const command = cli._[0] || "help";

try {
	require(`./${command}`).default(cli);
} catch (error) {
	console.error(`
    ERROR: "${command}" is not a valid command.
	`);
	require("./help").default();
}
