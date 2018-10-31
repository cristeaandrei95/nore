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
	INSERT INTO sessions (sid, token, expired) VALUES
		('1', 'sid_token', '${Date.now() + 1}'),
		('2', 'sid_token', '${Date.now() + 2}')
`;

const select_data = `
	SELECT * FROM sessions WHERE token == 'sid_token'
`;

tearDown(() => unlinkSync(dbFile));

test("SQLite()", async ({ end, equal }) => {
	const db = new SQLite({
		file: dbFile,
	});

	var result = await db.sql(create_table);
	equal(result.name, dbFile);

	var result = await db.run(insert_data);
	equal(result.changes, 2);

	var result = await db.get(select_data);
	equal(result[0].token, "sid_token");
	equal(result[1].token, "sid_token");

	var result = await db.getOne(select_data);
	equal(result.token, "sid_token");

	for (const entry of db.iterate(select_data)) {
		equal(result.token, "sid_token");
	}

	end();
});
