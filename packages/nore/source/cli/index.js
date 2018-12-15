import { readFile } from "@nore/std/fs";
// import getopts from "getopts";
import arg from "arg";
import "../utils/onUnhandledErrors";

const commands = ["start", "build"];

const cli = arg({
	// types
	"--help": Boolean,
	"--path": String,
	"--mode": String,
	"--debug": Boolean,

	// aliases
	"-h": "--help",
	"-p": "--path",
	"-m": "--mode",
	"-d": "--debug",
});

const command = cli._[0];
const showHelp = () => readFile(`${__dirname}/help`).then(console.log);

if (commands.includes(command)) {
	const module = require(`${__dirname}/${command}.js`);

	module.default({
		path: cli["--path"],
		mode: cli["--mode"],
		isDebug: cli["--debug"],
	});
} else if (!command || cli["--help"] || command == "help") {
	showHelp();
} else {
	console.error(`\n  ERROR: "${command}" is not a valid command.\n`);
	showHelp();
}
