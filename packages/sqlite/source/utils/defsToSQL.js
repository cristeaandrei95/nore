const keywords = ["CURRENT_TIME", "CURRENT_DATE", "CURRENT_TIMESTAMP"];

function fmtDefault(value) {
	return keywords.includes(value) ? value : `'${value}'`;
}

function toDefinition(def) {
	const column = [`"` + def.name + `"`];

	if (def.isAutoIncrement) {
		column.push(`INTEGER AUTOINCREMENT`);
	} else {
		column.push(def.type ? def.type.toUpperCase() : "TEXT");
	}

	if (def.isPrimaryKey) {
		column.push("PRIMARY KEY NOT NULL");
	} else if (def.isNullable === false) {
		column.push("NOT NULL");
	}

	if (def.default) {
		column.push(`DEFAULT ${fmtDefault(def.default)}`);
	}

	return column.join(" ");
}

function toForeignKeys(definitions) {
	const toSQL = ({ name, foreignKey: [table, column] }) =>
		`FOREIGN KEY ("${name}") REFERENCES "${table}" ("${column}")`;

	const foreignKeys = definitions
		.filter(e => e.foreignKey)
		.map(toSQL)
		.join(", ");

	return foreignKeys && `, ${foreignKeys}`;
}

function toUniques(definitions) {
	const uniques = definitions
		.filter(e => e.isUnique)
		.map(e => `"${e.name}"`)
		.join(", ");

	return uniques && `, UNIQUE (${uniques})`;
}

function defsToSQL(definitions) {
	const columns = definitions.map(toDefinition).join(", ");
	const foreignKeys = toForeignKeys(definitions);
	const uniques = toUniques(definitions);

	return columns + foreignKeys + uniques;
}

defsToSQL.toDefinition = toDefinition;
defsToSQL.toForeignKeys = toForeignKeys;
defsToSQL.toUniques = toUniques;

export default defsToSQL;
