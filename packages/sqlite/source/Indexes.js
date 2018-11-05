import { isArray, flatten } from "@nore/std/array";

const types = {
	c: "index",
	u: "unique",
	pk: "primary_key",
};

export default class Indexes {
	constructor(table) {
		this.table = table;
		this.db = table.db;
	}

	async set(name, columns) {
		columns = !columns ? [name] : isArray(columns) ? columns : [columns];
		columns = columns.map(name => `"${name}"`).join(", ");

		this.db.run(`CREATE INDEX "${name}" ON ${this.table.name} (${columns})`);
	}

	async getInfo(name) {
		return this.db.pragma(`index_info(${name})`);
	}

	async getAll() {
		const indexes = await this.db.pragma(`index_list(${this.table.name})`);
		const tasks = indexes.map(entry => this.getInfo(entry.name));
		const infos = await Promise.all(tasks);

		const result = infos.map((list, n) =>
			list.map(index => ({
				type: types[indexes[n].origin],
				name: indexes[n].name,
				column: index.name,
			}))
		);

		return flatten(result);
	}

	async get(name) {
		return this.getAll().then(indexes => indexes.filter(e => e.name === name));
	}

	async getByColumn(column) {
		return this.getAll().then(indexes =>
			indexes.filter(e => e.column === column)
		);
	}

	async delete(name) {
		return this.db.run(`DROP INDEX "${name}"`);
	}

	async deleteByColumn(column) {
		const indexes = await this.getByColumn(column);
		const tasks = indexes
			.filter(index => index.type === "index")
			.map(index => this.delete(index.name));

		return Promise.all(tasks);
	}
}
