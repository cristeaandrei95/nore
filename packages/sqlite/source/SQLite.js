import BetterSQLite3 from "better-sqlite3";
import { isString } from "@nore/std/assert";
import { isAbsolute } from "@nore/std/path";

// https://github.com/JoshuaWise/better-sqlite3/wiki/API
export default class SQLite {
	constructor(options = {}) {
		const { file, inMemory, isReadOnly, throwOnMissingFile } = options;

		if (!isString(file)) {
			throw Error(`Missing path to Connection database file.`);
		}

		if (!isAbsolute(file)) {
			throw Error(`The database file path must be an absolute path.`);
		}

		this.connection = new BetterSQLite3(file, {
			fileMustExist: throwOnMissingFile || false,
			readonly: isReadOnly || false,
			memory: inMemory || false,
		});

		// use WAL journaling mode by default
		if (options.useWAL !== false) {
			this.pragma("journal_mode = WAL");
		}

		// enable "FOREIGN KEY" support
		this.pragma("foreign_keys = ON");
	}

	async runRaw(sql) {
		return this.connection.exec(sql);
	}

	async run(sql, values = []) {
		return this.connection.prepare(sql).run(values);
	}

	async get(sql, values = []) {
		return this.connection.prepare(sql).get(values);
	}

	async getAll(sql, values = []) {
		return this.connection.prepare(sql).all(values);
	}

	async pragma(sql) {
		return this.connection.pragma(sql);
	}

	iterate(sql, values = []) {
		return this.connection.prepare(sql).iterate(values);
	}

	prepare(sql) {
		return this.connection.prepare(sql);
	}

	transaction(handler) {
		return this.connection.transaction(handler);
	}
}
