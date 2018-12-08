import "../util/onUnhandledErrors";
import { itExists } from "@nore/std/fs";
import getopts from "getopts";

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
