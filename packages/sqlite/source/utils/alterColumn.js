import parseCreateTableSQL from "./parseCreateTableSQL.js";
import defsToSQL from "./defsToSQL.js";

function toSQLDefinitions({ columns, foreignKeys }) {
	let sql = columns.join(", ");

	if (foreignKeys.length) {
		sql += `, ${foreignKeys.join(", ")}`;
	}

	return sql;
}

function getColumnsName(columns) {
	return columns.map(definition => definition.match(/^("(.+)")/)[1]);
}

function updateTransform(column, createTableSQL) {
	let { columns, foreignKeys } = parseCreateTableSQL(createTableSQL);
	let quotedName = `"${column.name}"`;

	// set the updated definition
	columns = columns.map(def =>
		def.indexOf(quotedName) === 0 ? defsToSQL.toDefinition(column) : def
	);

	// add or remove from FOREIGN KEY constraint
	const isNameInForeignKey = e => e.indexOf(quotedName) === 13;
	const isInKeys = foreignKeys.filter(isNameInForeignKey).length;

	if (column.foreignKey && !isInKeys) {
		foreignKeys.push(defsToSQL.toForeignKeys([column]));
	} else if (!column.foreignKey && isInKeys) {
		foreignKeys = foreignKeys.filter(e => !isNameInForeignKey(e));
	}

	return { columns, foreignKeys };
}

function deleteTransform(column, createTableSQL) {
	let { columns, foreignKeys } = parseCreateTableSQL(createTableSQL);

	// match the index of the column name in: `FOREIGN KEY "column" ...`
	foreignKeys = foreignKeys.filter(e => e.indexOf(column) !== 13);

	// the column names are quoted so the index will be 1 to skip the quote
	columns = columns.filter(e => e.indexOf(column) !== 1);

	return { columns, foreignKeys };
}

const transformers = {
	update: updateTransform,
	delete: deleteTransform,
};

// procedure from: https://www.sqlite.org/lang_altertable.html
async function transaction(table, action, column) {
	await table.db.pragma("foreign_keys = OFF");

	const sqliteTableInfo = await table.db.getAll(
		`SELECT type, sql FROM sqlite_master WHERE tbl_name == '${table.name}'`
	);

	const transform = transformers[action];
	const defs = transform(column, sqliteTableInfo[0].sql);
	const sqlDefs = toSQLDefinitions(defs);
	const columns = getColumnsName(defs.columns).join(", ");

	// create a new table with the updated column definitions
	await table.db.run(`CREATE TABLE "${table.name}__tmp" (${sqlDefs})`);

	// copy data from the old table to the new one
	await table.db.run(
		`INSERT INTO "${table.name}__tmp" SELECT ${columns} FROM "${table.name}"`
	);

	// delete the old table
	await table.db.run(`DROP TABLE ${table.name}`);

	// rename the new table as the old one
	await table.db.run(
		`ALTER TABLE "${table.name}__tmp" RENAME TO ${table.name}`
	);

	await table.db.pragma("foreign_keys = ON");

	// TODO: use meta to CREATE INDEX and CREATE TRIGGER
}

export default async function alterColumn(table, type, column) {
	return table.db.transaction(transaction)(table, type, column);
}
