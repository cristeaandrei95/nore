import Table from "./Table.js";
import SQLite from "./SQLite.js";
import Migrations from "./Migrations.js";

export default class Database {
	constructor(options = {}) {
		// the SQLite connection
		this.sqlite = new SQLite(options);

		// cache table instances
		this.tables = new Map();
	}

	create(name, definition) {
		return this.table(name).create(definition);
	}

	table(name) {
		const { tables, sqlite } = this;

		if (tables.has(name)) {
			return tables.get(name);
		}

		const table = new Table({ name, db: sqlite });
		tables.set(name, table);
		return table;
	}

	list() {}
}
