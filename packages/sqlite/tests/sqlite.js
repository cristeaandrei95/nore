import { test, tearDown } from "tap";
import { SQLite } from "../source";
import { getTemporaryFile } from "./util";

const dbFile = getTemporaryFile();

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

tearDown(() => dbFile.delete());

test("SQLite()", async ({ end, equal }) => {
	const db = new SQLite({ file: dbFile.path });

	// create table
	var result = await db.runRaw(create_table);
	equal(result.name, dbFile.path);

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
	var result = await db.getAll(select_data);
	equal(result[0].token, "sid_token");
	equal(result[1].token, "sid_token");

	// select first row
	var result = await db.get(select_data);
	equal(result.token, "sid_token");

	// iterate over table entries
	for (const entry of db.iterate(select_data)) {
		equal(result.token, "sid_token");
	}

	var result = await db.pragma(`table_info(sessions)`);
	equal(result.length, 3);
	equal(result[0].name, "sid");

	end();
});
