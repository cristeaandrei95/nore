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

	if (def.isUnique) {
		column.push(`UNIQUE`);
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

function defsToSQL(definitions) {
	const columns = definitions.map(toDefinition).join(", ");
	const foreignKeys = toForeignKeys(definitions);

	return columns + foreignKeys;
}

defsToSQL.toDefinition = toDefinition;
defsToSQL.toForeignKeys = toForeignKeys;

export default defsToSQL;
