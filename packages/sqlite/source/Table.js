import { keys, first } from "@nore/std/object";
import { isArray } from "@nore/std/array";
import nql from "@nore/nql";
import defsToSQL from "./utils/defsToSQL.js";
import Indexes from "./Indexes.js";
import Columns from "./Columns.js";

export default class Table {
	constructor({ name, db }) {
		this.tableName = name;
		this.isDeleted = false;
		this.db = db;
		this.indexes = new Indexes(this);
		this.columns = new Columns(this);
	}

	get name() {
		if (this.isDeleted) {
			throw Error(`Table ${this.tableName} was deleted.`);
		}

		return this.tableName;
	}

	async create(definitions) {
		const columns = defsToSQL(definitions);
		const sql = `CREATE TABLE "${this.name}" (${columns})`;

		return this.db.run(sql);
	}

	async drop() {
		this.db.run(`DROP TABLE ${this.name}`);
		return (this.isDeleted = true);
	}

	async rename(name) {
		const sql = `ALTER TABLE ${this.name} RENAME TO ${name}`;
		this.tableName = name;
		return this.db.run(sql);
	}

	async count(target = "*", filters = {}) {
		if (filters.isDistinct) {
			target = `DISTINCT ${target}`;
		}

		return this.db
			.get(`SELECT COUNT(${target}) FROM ${this.name}`)
			.then(result => first(result));
	}

	async insert(data) {
		const [sql, values] = nql({
			type: "insert",
			table: this.name,
			values: data,
		});

		return this.db.run(sql, values);
	}

	async query(sql, values = []) {
		return this.db.getAll(sql, values);
	}

	async find(query, filters = {}) {
		const [sql, values] = nql({
			type: "select",
			table: this.name,
			where: query,
			columns: filters.columns || "*",
			orderBy: filters.orderBy,
			groupBy: filters.groupBy,
			offset: filters.offset,
			limit: filters.limit || 100,
			distinct: filters.distinct,
		});

		return this.db.getAll(sql, values);
	}

	async findById(id, filters = {}) {
		const [sql, values] = nql({
			type: "select",
			table: this.name,
			where: { id },
			columns: filters.columns || "*",
		});

		return this.db.get(sql, values);
	}

	async update(data, query) {
		const [sql, values] = nql({
			type: "update",
			table: this.name,
			set: data,
			where: query,
		});

		return this.db.run(sql, values);
	}

	async delete(query) {
		const [sql, values] = nql({
			type: "delete",
			table: this.name,
			where: query,
		});

		return this.db.run(sql, values);
	}
}
