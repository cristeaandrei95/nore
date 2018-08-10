import Table from "./Table.js";
import SQLite from "./SQLite.js";
import getTableDefinition from "./util/getTableDefinition.js";

export default class Database {
	constructor(options = {}) {
		if (!options.file) {
			throw Error(`Missing path to SQLite database file.`);
		}

		// the SQLite connection
		this.sqlite = new SQLite(options);

		// cache table instances
		this.tables = new Map();
	}

	query(query) {
		query.type = "select";

		return this.sqlite.getAll(query);
	}

	create(table, definition) {
		return this.sqlite.run({
			type: "create-table",
			table: table,
			ifNotExists: true,
			definition: getTableDefinition(definition),
		});
	}

	rename(from, to) {
		return this.run({
			type: "alter-table",
			table: from,
			ifExists: true,
			action: { rename: to },
		});
	}

	drop(table) {
		return this.run({
			type: "drop-table",
			table: table,
			ifExists: true,
		});
	}

	// the SQLite table API
	table(name) {
		let table = this.tables.get(name);

		if (!table) {
			table = new Table({ name, db: this.sqlite });

			this.tables.set(name, table);
		}

		return table;
	}
}
