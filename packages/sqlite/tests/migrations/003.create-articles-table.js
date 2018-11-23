export function up({ db }) {
	throw new Error("omff")
	await db.run(`
		CREATE TABLE articles (
			id TEXT PRIMARY KEY NOT NULL,
			title TEXT NOT NULL,
			content TEXT NOT NULL
		);

		INSERT INTO articles (id, title, content) VALUES ('id', 'title', 'content');
	`);
}

export function down({ db }) {
	db.run(`
		DROP TABLE IF EXISTS articles;
	`);
}
