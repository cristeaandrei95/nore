import { unlinkSync } from "fs";
import { tmpdir } from "os";
import { test, tearDown } from "tap";
import { SQLite } from "../source";

const dbFile = `${tmpdir()}/sqlite_test.sqlite`;

const create_table = `
	CREATE TABLE sessions (
		sid TEXT PRIMARY KEY,
		token TEXT NOT NULL,
		expired TEXT NOT NULL
	);

	CREATE UNIQUE INDEX sessions_expired ON sessions(expired);
`;

const insert_data = `
	INSERT INTO sessions (sid, token, expired) VALUES (?, ?, ?)
`;

const select_data = `
	SELECT * FROM sessions WHERE token == 'sid_token'
`;

tearDown(() => unlinkSync(dbFile));

test("SQLite()", async ({ end, equal }) => {
	const db = new SQLite({
		file: dbFile,
	});

	// create table
	var result = await db.sql(create_table);
	equal(result.name, dbFile);

	// insert data using transactions
	var statement = db.prepare(insert_data);
	var insert = db.transaction(async data =>
		Promise.all(data.map(entry => statement.run(entry)))
	);
	var result = await insert([
		["1", "sid_token", "${Date.now() + 1}"],
		["2", "sid_token", "${Date.now() + 2}"],
	]);
	equal(result.length, 2);

	// select all data
	var result = await db.get(select_data);
	equal(result[0].token, "sid_token");
	equal(result[1].token, "sid_token");

	// select first row
	var result = await db.getOne(select_data);
	equal(result.token, "sid_token");

	// iterate over table entries
	for (const entry of await db.iterate(select_data)) {
		equal(result.token, "sid_token");
	}

	var result = await db.pragma(`table_info(sessions)`);
	equal(result.length, 3);
	equal(result[0].name, "sid");

	end();
});
