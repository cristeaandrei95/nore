import { readDirectory } from "@nore/std/fs";
import { isAbsolute, join } from "@nore/std/path";
import runMigration from "./utils/runMigration.js";

export default class Migrations {
	constructor({ path, db }) {
		this.db = db;
		this.path = isAbsolute(path) ? path : join(getDirectory(db.file), path);
		this.table = db.table("migrations");
	}

	async initialize() {
		await this.db.run(`
			CREATE TABLE IF NOT EXISTS migrations (
				id INTEGER PRIMARY KEY NOT NULL,
				file TEXT NOT NULL,
				date TEXT NOT NULL
			);

			INSERT INTO migrations (id, file, date) VALUES (1, "", "");
		`);
	}

	async migrate() {
		const files = await readDirectory(this.path);
		const lastRun = await this.table.findById(1);
		const index = files.indexOf(lastRun.file);

		// nothing was run
		if (!lastRun.file) {
			for (const file of files) {
				const isSuccessful = await runMigration(file, "up");
			}
		}
	}

	async files() {}
}
