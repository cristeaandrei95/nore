import Table from "./Table";
import SQLite from "./SQLite";

export default class Database {
	constructor(options = {}) {
		this.sqlite = new SQLite(options);

		// cache table instances
		this.$tables = new Map();
	}

	async list() {
		const sql = `SELECT name FROM sqlite_master WHERE type == 'table'`;

		return this.sqlite.getAll(sql).then(result => result.map(e => e.name));
	}

	table(name) {
		let table = this.$tables.has(name);

		if (!table) {
			table = new Table({ name, db: this.sqlite });

			this.$tables.set(name, table);
		}

		return table;
	}
}
