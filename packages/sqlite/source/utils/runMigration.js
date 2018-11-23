export default async function runMigration(file, method) {
	try {
		const migration = require(file);
		const type = typeof migration.up;

		if (type === "string") {
			await this.db.run(migration.up);
		}

		if (type === "function") {
			await migration.up({ db: this.db });
		}
	} catch (error) {
		console.log("SAOIDJISAOJOI", error);
	}
}
