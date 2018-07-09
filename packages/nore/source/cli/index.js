import argv from "yargs-parser";

const aliases = {
	config: ["c"],
	mode: ["m"],
	path: ["p"],
	source: ["s"],
	output: ["o"],
	variables: ["v"],
	help: ["h"],
};

const cli = argv(process.argv.slice(2), { alias: aliases });

const commands = ["start", "build"];
const command = cli._.filter(cmd => commands.includes(cmd)).pop();

if (!command || cli.h) {
	console.log(`
    Usage: nore [command] [options]

    Commands:
      start             start nore platform
      build             build files for production


    Options:
      -h --help         displays help information
      -c --config       config file path

    TODO: add options
	`);
} else {
	const handler = require(`./${command}`).default;

	handler(cli);
}
