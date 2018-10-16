import Table from "./Table.js";
import Connection from "./Connection.js";
import Migrations from "./Migrations.js";

export default class Database {
	constructor(options = {}) {
		// the Connection connection
		this.db = new Connection(options);

		// cache table instances
		this.tables = new Map();
	}

	table(name) {
		const { tables, db } = this;

		if (tables.has(name)) {
			return tables.get(name);
		}

		const table = new Table({ name, db });

		tables.set(name, table);

		return table;
	}
}
