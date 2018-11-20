const DELIMITER = "¡!";
const FOREIGN_KEY = "FOREIGN KEY";
const REGEX_COMMAS = /(?<=^([^']|'[^']*')*),\s/g;
const REGEX_DEFINITIONS = /\((.+)\)$/;

export default function parseCreateTableSQL(sql) {
	const [_, definitions] = sql.match(REGEX_DEFINITIONS);
	// first split by unique definition
	let [defs, uniques] = definitions.split(", UNIQUE ");

	// replace all commas that join the definitions with a special delimiter
	// so it won't replace commas from the DEFAULT syntax
	defs = defs.replace(REGEX_COMMAS, DELIMITER).split(DELIMITER);
	uniques = uniques && uniques.length ? uniques.slice(1, -1).split(", ") : [];

	const foreignKeys = defs.filter(def => def.indexOf(FOREIGN_KEY) === 0);
	const columns = defs.filter(def => def.indexOf(FOREIGN_KEY) !== 0);

	return {
		columns,
		foreignKeys,
		uniques,
	};
}
