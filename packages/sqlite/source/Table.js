import { assign } from "@nore/std/object";
import getTableDefinition from "./util/getTableDefinition.js";
import mosql from "./util/mosql.js";

/*
	API CRUD:
	.insert(data) - add records
	.find(query)
	.findById(id)
	.findOne(query)
	.remove(query) -> return removed records

	API on table:
	.drop() - delete table
	.rename(newName)
*/

// The SQLite table API
export default class Table {
	constructor({ name, db }) {
		this.tableName = name;
		this.db = db;
	}

	get name() {
		if (this.isDropped) {
			throw Error(`Table "${this.tableName}" was dropped`);
		}

		return this.tableName;
	}

	create(definition) {
		const { sql, values } = mosql({
			type: "create-table",
			table: this.name,
			ifNotExists: true,
			definition: getTableDefinition(definition),
		});

		return this.db.run(sql, values).then(result => {
			this.isDropped = false;

			return result;
		});
	}

	rename(newName) {
		const { sql } = mosql({
			type: "alter-table",
			table: this.name,
			action: { rename: newName },
		});

		return this.db.run(sql).then(() => {
			this.tableName = newName;
		});
	}

	drop() {
		const { sql } = mosql({
			type: "drop-table",
			table: this.name,
			ifExists: true,
		});

		return this.db.run(sql).then(() => {
			this.isDropped = true;
		});
	}

	insert(data) {
		const { sql, values } = mosql({
			type: "insert",
			table: this.name,
			values: data,
		});

		return this.db.run(sql, values);
	}

	find(where, options = {}) {
		const { sql, values } = mosql(
			assign(
				{
					type: "select",
					table: this.name,
					where: where,
				},
				options
			)
		);

		return this.db.getAll(sql, values);
	}

	findOne(where, options = {}) {
		const { sql, values } = mosql(
			assign(
				{
					type: "select",
					table: this.name,
					where: where,
				},
				options
			)
		);

		return this.db.get(sql, values);
	}

	findById(id) {
		return this.findOne({ id });
	}

	remove(where) {
		const { sql, values } = mosql({
			type: "delete",
			table: this.name,
			where: where,
		});

		return this.db.run(sql, values);
	}

	update(where, updates) {
		const { sql, values } = mosql({
			type: "update",
			table: this.name,
			where: where,
			updates: updates,
		});

		return this.db.run(sql, values);
	}
}
