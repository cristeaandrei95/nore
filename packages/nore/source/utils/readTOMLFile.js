import { readFile } from "@nore/std/fs";
import toml from "toml";

const fmtError = (error, file) => `
  Error parsing TOML file: ${file}.

  ${error}
`;

export default async function readTOMLFile(file) {
	try {
		return toml.parse(await readFile(file));
	} catch (error) {
		throw Error(fmtError(error));
	}
}
