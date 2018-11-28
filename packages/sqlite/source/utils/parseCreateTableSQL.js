const DELIMITER = "¡!";
const FOREIGN_KEY = "FOREIGN KEY";
const REGEX_COMMAS = /(?<=^([^']|'[^']*')*),\s/g;
const REGEX_DEFINITIONS = /\((.+)\)$/;

export default function parseCreateTableSQL(sql) {
	const [_, match] = sql.match(REGEX_DEFINITIONS);
	const definitions = match.replace(REGEX_COMMAS, DELIMITER).split(DELIMITER);

	const columns = definitions.filter(def => def.indexOf(FOREIGN_KEY) !== 0);
	const foreignKeys = definitions.filter(def => def.indexOf(FOREIGN_KEY) === 0);

	return { columns, foreignKeys };
}
