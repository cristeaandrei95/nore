import { readFile } from "@nore/std/fs";
import yaml from "js-yaml";

const fmtError = (error, file) => `
  Error parsing YAML file: ${file}.

  ${error}
`;

export default async function readYAMLFile(path) {
	try {
		return yaml.safeLoad(await readFile(path));
	} catch (error) {
		throw Error(fmtError(error));
	}
}
