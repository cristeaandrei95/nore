import cleanStack from "clean-stack";
import chalk from "chalk";

const { ES_SOURCE_PATH } = process.env;
const fmtPath = source => source.replace(new RegExp(process.cwd(), "g"), ".");
const fmtStack = stack => chalk.gray(fmtPath(cleanStack(stack)));

const fmtError = (type, error) => `
  ${chalk.red(`UNHANDLED ${type} (${error.name}):`)}

  ${fmtPath(error.message)}

  ${fmtStack(error.stack)}
`;

process.on(`unhandledRejection`, error => {
	// This will exit the process in newer Node anyway
	// so lets be consistent across versions and crash
	console.log(fmtError("REJECTION", error));
	process.exit(1);
});

process.on(`uncaughtException`, error => {
	console.log(fmtError("EXCEPTION", error));
	process.exit(1);
});
