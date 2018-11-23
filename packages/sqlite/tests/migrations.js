import { test, tearDown } from "tap";
import Database from "../source";
import { getTemporaryFile } from "./utils";

const dbFile = getTemporaryFile();

test("SQLite()", async ({ end, equal }) => {
	const db = new Database({
		migrations: __dirname + "/migrations",
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

	end();
});

tearDown(() => dbFile.delete());
