import { parse } from "./definitions.js";

function parseCreateTable(sql) {
	const [match] = sql.match(/\((.*)\)/g);
	const [defs, uniques] = match.slice(1, -1).split(", UNIQUE ");
	const definitions = defs.split(", ");

	return {
		definitions,
		columns: definitions.map(e => e.match(/^(".+")/)[0]),
		uniques: uniques.slice(1, -1).split(", "),
	};
}

function joinMeta(meta) {
	for (const key in meta) {
		meta[key] = meta[key].join(", ");
	}
	return meta;
}

function updateAction(column, { definitions, columns, uniques }) {
	definitions = definitions.map(
		def => (def.includes(`"${column.name}"`) ? parse(column) : def)
	);

	if (column.isUnique && !uniques.includes(column.name)) {
		uniques = uniques.concat(column.name);
	} else if (!column.isUnique && uniques.includes(column.name)) {
		uniques = uniques.filter(e => e !== column.name);
	}

	return joinMeta({ definitions, columns, uniques });
}

function deleteAction(column, { definitions, columns, uniques }) {
	const quotedColumn = `"${column}"`;

	definitions = definitions.filter(def => !def.includes(quotedColumn));
	columns = columns.filter(name => name !== quotedColumn);

	if (uniques.includes(column)) {
		uniques = uniques.filter(name => name !== column);
	}

	return joinMeta({ definitions, columns, uniques });
}

const actions = {
	update: updateAction,
	delete: deleteAction,
};

// procedure from: https://www.sqlite.org/lang_altertable.html
async function procedure(table, action, column) {
	const sqliteTableInfo = await table.db.getAll(
		`SELECT type, sql FROM sqlite_master WHERE tbl_name == '${table.name}'`
	);

	const doAction = actions[action];
	const meta = parseCreateTable(sqliteTableInfo[0].sql);
	const { definitions, columns, uniques } = doAction(column, meta);

	// construct SQL column definitions and unique columns
	const sqlDefinitions = definitions + (uniques && `, UNIQUE (${uniques})`);

	// create a new table with the updated column definitions
	await table.db.run(`CREATE TABLE "${table.name}__tmp" (${sqlDefinitions})`);

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

	// TODO: use meta to CREATE INDEX and CREATE TRIGGER
}

export default async function alterColumn(table, type, column) {
	return table.db.transaction(procedure)(table, type, column);
}
