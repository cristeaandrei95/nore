import { readDirectory, itExists } from "@nore/std/fs";
import { isAbsolute, join, getFileName } from "@nore/std/path";

export default class Migrations {
	constructor({ path, db, tableName }) {
		this.db = db;
		this.path = path;
		this.tableName = tableName || "migrations";
		this.table = db.table(this.tableName);
	}

	async initialize() {
		if (await this.db.has(this.tableName)) return;

		await this.db.run(`
			CREATE TABLE ${this.tableName} (
				id TEXT PRIMARY KEY NOT NULL,
				file TEXT NOT NULL,
				date TEXT NOT NULL
			);

			INSERT INTO ${this.tableName} (id, file, date) VALUES ("settings", "", "");
		`);
	}

	async migrate(fileName) {
		const files = await readDirectory(this.path);
		const lastFileRan = await this.getLastRanMigration();

		let lastRunMigration = null;
		let error = null;

		// a target migration file, useful for rollback
		if (fileName) {
			const target = join(this.path, fileName);
			const targetIndex = files.indexOf(target);
			const lastIndex = files.indexOf(lastFileRan);

			// migrate or rollback to specific file
			const method = lastIndex > targetIndex ? "down" : "up";
			const migrations =
				lastIndex > targetIndex
					? files.slice(targetIndex + 1).reverse()
					: files.slice(lastIndex + 1, targetIndex + 1);

			const result = await this.runMigrations(migrations, method);

			lastRunMigration = result.error ? result.migration : target;
			error = result.error;
		} else {
			const index = files.indexOf(lastFileRan);
			const migrations = files.slice(index === -1 ? 0 : index + 1);
			const result = await this.runMigrations(migrations, "up");

			lastRunMigration = result.migration;
			error = result.error;
		}

		if (lastRunMigration) {
			await this.setLastRanMigration(lastRunMigration);
		}

		if (error) {
			throw error;
		}
	}

	async runMigrations(migrations, method) {
		let migration = null;
		let error = null;

		for (const file of migrations) {
			try {
				await this.runMigration(file, method);

				migration = file;
			} catch (err) {
				error = err;
				break;
			}
		}

		return { migration, error };
	}

	async runMigration(file, method) {
		const module = require(file);
		const migration = module[method];
		const type = typeof migration;

		// migration is a raw SQL string
		if (type === "string") {
			await this.db.run(migration);
		}

		// migration is a function, so we pass the db instance
		if (type === "function") {
			await migration({ db: this.db });
		}
	}

	async getLastRanMigration() {
		const lastRun = await this.table.findById("settings");

		return join(this.path, lastRun.file);
	}

	async setLastRanMigration(file) {
		const update = {
			file: getFileName(file),
			date: String(new Date()),
		};

		await this.table.update({ id: "settings" }, update);
	}
}
