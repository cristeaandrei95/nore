import { itExists } from "@nore/std/fs";
import chalk from "chalk";

export default async function run(command, args) {
	const file = `${__dirname}/commands/${command}.js`;
	const isFile = await itExists(file);

	if (isFile) {
		require(file).default({ command, args });
	} else {
		console.log(chalk.red(`\n  ERROR: "${command}" is not a valid command.\n`));
		run("help", args);
	}
}
