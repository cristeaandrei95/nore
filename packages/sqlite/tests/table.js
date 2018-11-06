import { test, only, tearDown } from "tap";
import { rndInt, rndStr } from "./utils";
import getFixtures from "./fixtures";

const { dbFile, db, tableName, columns, samples } = getFixtures(50);

tearDown(() => dbFile.delete());

test("table", async ({ end, equal, same, ok, throws }) => {
	const table = db.table(tableName);

	// create table
	await table.create(columns);

	// rename table
	var result = await table.rename(rndStr());
	ok(table.name !== tableName);

	// insert data
	var result = await table.insert(samples);
	same(result, { changes: 50, lastInsertRowid: 50 });

	// count
	var result = await table.count();
	ok(result === 50);
	var result = await table.count("ipsum");
	ok(result < 50);

	// find by id
	var sample = samples[rndInt(0, 50 - 1)];
	var result = await table.findById(sample.id);
	same(result, sample);

	// find by id, filter by columns
	var sample = samples[rndInt(0, 50 - 1)];
	var result = await table.findById(sample.id, { columns: ["id", "sit"] });
	same(result, { id: sample.id, sit: sample.sit });

	// find
	var sample = samples[rndInt(0, 50 - 1)];
	var result = await table.find({ id: sample.id });
	equal(result.length, 1);
	same(result[0], sample);

	// find -> no result
	var result = await table.find({ not: "found" });
	same(result, []);

	// update
	var sample = samples[rndInt(0, 50 - 1)];
	await table.update({ lorem: "updated" }, { id: sample.id });
	var result = await table.findById(sample.id);
	equal(result.lorem, "updated");

	// delete
	var result = await table.delete({ lorem: "updated" });
	equal(result.changes, 1);
	var result = await table.findById(sample.id);
	ok(result == null);

	// drop table
	await table.drop();
	equal(table.isDeleted, true);

	try {
		await table.db.get(`SELECT * FROM ${tableName}`);
	} catch (error) {
		equal(error.message, `no such table: ${tableName}`);
	}

	end();
});
