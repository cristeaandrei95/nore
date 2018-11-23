import Table from "./Table";
import SQLite from "./SQLite";
import Migrations from "./Migrations";

export default class Database {
	constructor(options = {}) {
		this.sqlite = new SQLite(options);
		this.file = options.file;

		// cache table instances
		this.$tables = new Map();

		if (options.migrations) {
			this.migrations = new Migrations({
				path: options.migrations,
				db: this,
			});
		}
	}

	async run(sql) {
		return this.sqlite.runRaw(sql);
	}

	async list() {
		const sql = `SELECT name FROM sqlite_master WHERE type == 'table'`;

		return this.sqlite.getAll(sql).then(result => result.map(e => e.name));
	}

	async has(table) {
		const tables = await this.list();

		return tables.includes(table);
	}

	async create(table, definitions) {
		return this.table(table).create(definitions);
	}

	async drop(table) {
		return this.table(table).drop();
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
