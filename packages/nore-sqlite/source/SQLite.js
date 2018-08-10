import Connection from "better-sqlite3";
import { buildQuery } from "./util/mosql.js";

export default class SQLite {
	constructor(options) {
		this.connection = new Connection(options.file, {
			memory: options.inMemory || false,
			readonly: options.isReadOnly || false,
			fileMustExist: options.throwOnMissingFile || false,
		});
	}

	command(query, method) {
		const { sql, values } = buildQuery(query);
		const statement = this.connection.prepare(sql);

		return Promise.resolve(statement[method](values));
	}

	// only on queries that do not return data
	run(query) {
		return this.command(query, "run");
	}

	// only on queries that return data
	get(query) {
		return this.command(query, "get");
	}

	// only on queries that return data
	getAll(query) {
		return this.command(query, "all");
	}

	// only on queries that return data
	getOneByOne(query) {
		return this.command(query, "iterate");
	}
}
