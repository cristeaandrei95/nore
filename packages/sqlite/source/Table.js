import { keys, first } from "@nore/std/object";
import { isArray } from "@nore/std/array";
import { toSQL } from "./util/definitions.js";
import Indexes from "./Indexes.js";
import Columns from "./Columns.js";

export default class Table {
	constructor({ name, db }) {
		this.tableName = name;
		this.isDropped = false;
		this.db = db;
		this.indexes = new Indexes(this);
		this.columns = new Columns(this);
	}

	get name() {
		if (this.isDropped) {
			throw Error(`Table ${this.tableName} was deleted.`);
		}

		return this.tableName;
	}

	async create(definitions) {
		const columns = toSQL(definitions);
		const sql = `CREATE TABLE "${this.name}" (${columns})`;

		return this.db.run(sql);
	}

	async drop() {
		this.db.run(`DROP TABLE ${this.name}`);
		this.isDropped = true;
	}

	async rename(name) {
		const sql = `ALTER TABLE ${this.name} RENAME TO ${name}`;
		this.tableName = name;
		return this.db.run(sql);
	}

	async insert(data) {
		if (!isArray(data)) data = [data];

		const columns = keys(data[0]);
		const entries = [];
		const values = [];

		for (const entry of data) {
			entries.push(`(${columns.map(e => "?").join(", ")})`);
			values.push.apply(values, columns.map(e => entry[e]));
		}

		return this.db.run(
			`INSERT INTO ${this.name} (${columns}) VALUES ${entries.join(", ")}`,
			values
		);
	}

	async findById(id, options = {}) {
		let columns = "*";

		if (options.columns) {
			columns = options.columns.map(name => `"${name}"`).join(", ");
		}

		const sql = `SELECT ${columns} FROM ${this.name} WHERE "id" == ?`;

		return this.db.get(sql, [id]);
	}

	async count(target = "*", options = {}) {
		if (options.isDistinct) {
			target = `DISTINCT ${target}`;
		}

		return this.db
			.get(`SELECT COUNT(${target}) FROM ${this.name}`)
			.then(result => first(result));
	}
}
