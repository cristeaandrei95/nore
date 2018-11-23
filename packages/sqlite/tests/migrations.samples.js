export default {
	create_sessions_table: `
			export const up = \`
				CREATE TABLE sessions (
					id TEXT PRIMARY KEY NOT NULL,
					token TEXT NOT NULL,
					session TEXT NOT NULL
				);

				INSERT INTO sessions (id, token, session) VALUES ('id', 'token', 'session');
			\`;

			export const down = \`
				DROP TABLE IF EXISTS sessions;
			\`;
	`,

	create_users_table: `
			export const up = \`
				CREATE TABLE users (
					id TEXT PRIMARY KEY NOT NULL,
					first_name TEXT NOT NULL,
					last_name TEXT NOT NULL
				);

				INSERT INTO users (id, first_name, last_name) VALUES ('id', 'first_name', 'last_name');
			\`;

			export const down = \`
				DROP TABLE IF EXISTS users;
			\`;
	`,

	create_articles_table: `
			export async function up({ db }) {
				await db.run(\`
					CREATE TABLE articles (
						id TEXT PRIMARY KEY NOT NULL,
						title TEXT NOT NULL,
						content TEXT NOT NULL
					);

					INSERT INTO articles (id, title, content) VALUES ('id', 'title', 'content');
				\`);
			}

			export async function down({ db }) {
				db.run(\`
					DROP TABLE IF EXISTS articles;
				\`);
			}
	`,

	create_tickets_table: `
			export async function up({ db }) {
				await db.run(\`
					CREATE TABLE tickets (
						id TEXT PRIMARY KEY NOT NULL,
						ticket TEXT NOT NULL,
						code TEXT NOT NULL
					);

					INSERT INTO tickets (id, ticket, code) VALUES ('id', 'ticket', 'code');
				\`);
			}

			export async function down({ db }) {
				db.run(\`
					DROP TABLE IF EXISTS tickets;
				\`);
			}
	`,

	migration_with_error: `
			export async function up({ db }) {
				throw new Error("migration.up test error sample");
			}

			export async function down({ db }) {
				throw new Error("migration.down test error sample");
			}
	`,
};
