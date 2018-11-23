import { test, tearDown, only } from "tap";
import Database from "../source";
import { getTemporaryDirectory, getTemporaryFile, writeToFile } from "./utils";
import samples from "./migrations.samples.js";

test("Migrations – run all", async ({ end, equal }) => {
	const dbFile = getTemporaryFile();
	const migrations = getTemporaryDirectory();

	writeToFile(`${migrations.path}/001`, samples.create_sessions_table);
	writeToFile(`${migrations.path}/002`, samples.create_users_table);
	writeToFile(`${migrations.path}/003`, samples.create_articles_table);

	const db = new Database({
		migrations: migrations.path,
		file: dbFile.path,
	});

	await db.migrations.initialize();
	await db.migrations.migrate();

	const users = await db.table("users").find();
	const sessions = await db.table("sessions").find();
	const articles = await db.table("articles").find();

	equal(users[0].id, "id");
	equal(sessions[0].id, "id");
	equal(articles[0].id, "id");
	equal(await db.migrations.getLastRanMigration(), `${migrations.path}/003`);

	migrations.delete();
	dbFile.delete();

	end();
});

test("Migrations – partial run", async ({ end, equal, ok }) => {
	const dbFile = getTemporaryFile();
	const migrations = getTemporaryDirectory();

	writeToFile(`${migrations.path}/001`, samples.create_sessions_table);
	writeToFile(`${migrations.path}/002`, samples.create_users_table);
	writeToFile(`${migrations.path}/003`, samples.migration_with_error);
	writeToFile(`${migrations.path}/004`, samples.create_articles_table);

	const db = new Database({
		migrations: migrations.path,
		file: dbFile.path,
	});

	await db.migrations.initialize();

	try {
		await db.migrations.migrate();
		throw Error("invalid");
	} catch (error) {
		ok(error.message != "invalid");
	}

	const users = await db.table("users").find();
	const sessions = await db.table("sessions").find();

	equal(users[0].id, "id");
	equal(sessions[0].id, "id");
	equal(await db.has("articles"), false);
	equal(await db.migrations.getLastRanMigration(), `${migrations.path}/002`);

	migrations.delete();
	dbFile.delete();

	end();
});

test("Migrations – from last migration", async ({ end, equal, ok }) => {
	const dbFile = getTemporaryFile();
	const migrations = getTemporaryDirectory();

	writeToFile(`${migrations.path}/001`, samples.create_sessions_table);

	const db = new Database({
		migrations: migrations.path,
		file: dbFile.path,
	});

	await db.migrations.initialize();
	await db.migrations.migrate();

	equal(await db.migrations.getLastRanMigration(), `${migrations.path}/001`);

	writeToFile(`${migrations.path}/002`, samples.create_users_table);
	writeToFile(`${migrations.path}/003`, samples.create_articles_table);

	await db.migrations.migrate();

	const users = await db.table("users").find();
	const sessions = await db.table("sessions").find();
	const articles = await db.table("articles").find();

	equal(users[0].id, "id");
	equal(sessions[0].id, "id");
	equal(articles[0].id, "id");
	equal(await db.migrations.getLastRanMigration(), `${migrations.path}/003`);

	migrations.delete();
	dbFile.delete();

	end();
});

test("Migrations – migrate to / rollback", async ({ end, equal }) => {
	const dbFile = getTemporaryFile();
	const migrations = getTemporaryDirectory();

	writeToFile(`${migrations.path}/001`, samples.create_sessions_table);
	writeToFile(`${migrations.path}/002`, samples.create_users_table);
	writeToFile(`${migrations.path}/003`, samples.create_articles_table);
	writeToFile(`${migrations.path}/004`, samples.create_tickets_table);

	const db = new Database({
		migrations: migrations.path,
		file: dbFile.path,
	});

	await db.migrations.initialize();
	await db.migrations.migrate();

	equal(await db.migrations.getLastRanMigration(), `${migrations.path}/004`);

	await db.migrations.migrate("001");

	equal(await db.has("sessions"), true);
	equal(await db.has("users"), false);
	equal(await db.has("articles"), false);
	equal(await db.has("tickets"), false);
	equal(await db.migrations.getLastRanMigration(), `${migrations.path}/001`);

	await db.migrations.migrate("003");

	equal(await db.has("sessions"), true);
	equal(await db.has("users"), true);
	equal(await db.has("articles"), true);
	equal(await db.has("tickets"), false);
	equal(await db.migrations.getLastRanMigration(), `${migrations.path}/003`);

	migrations.delete();
	dbFile.delete();

	end();
});
