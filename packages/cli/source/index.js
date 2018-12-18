import cli from "arg";
import run from "./run.js";

const defaults = {
	"--path": process.cwd(),
	"--mode": "development",
	"--debug": false,
};

const options = {
	// types
	"--help": Boolean,
	"--path": String,
	"--mode": String,
	"--debug": Boolean,
	"--version": Boolean,

	// aliases
	"-h": "--help",
	"-p": "--path",
	"-m": "--mode",
	"-d": "--debug",
	"-v": "--version",
};

const args = Object.assign({}, defaults, cli(options));
const command = args._[0];

// output the version
if (args["--version"]) {
	return run("version", args);
}

// output the version
if (args["--help"] || !command) {
	return run("help", args);
}

run(command, args);
