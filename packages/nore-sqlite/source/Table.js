import { assign } from "@nore/std/object";

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

export default class Table {
	constructor({ name, db }) {
		this.name = name;
		this.db = db;
	}

	// CRUD
	insert(data) {
		return this.db.run({
			type: "insert",
			table: this.name,
			values: data,
		});
	}

	find(where, options = {}) {
		const query = assign(
			{
				type: "select",
				table: this.name,
				where: where,
			},
			options
		);

		return this.db.getAll(query);
	}

	findOne(where, options = {}) {
		const query = assign(
			{
				type: "select",
				table: this.name,
				where: where,
			},
			options
		);

		return this.db.get(query);
	}
}
