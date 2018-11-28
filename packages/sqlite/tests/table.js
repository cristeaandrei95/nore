import { test, only, tearDown } from "tap";
import Database from "../source";
import * as util from "./utils";

const columns = [
	{ name: "id", type: "text", isPrimaryKey: true },
	{ name: "lorem", type: "text", isUnique: true },
	{ name: "ipsum", type: "real", default: 100 },
	{ name: "sit", type: "integer" },
];

const samples = util.getRandomData(columns, 50);
const dbFile = util.getTemporaryFile();
const db = new Database({ file: dbFile.path });

test("table", async ({ end, equal, same, ok, throws }) => {
	const tableName = util.getRandomString();
	const table = db.table(tableName);

	// create table
	await table.create(columns);

	// rename table
	var result = await table.rename(util.getRandomString());
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
	var sample = samples[util.getRandomInt(0, 50 - 1)];
	var result = await table.findById(sample.id);
	same(result, sample);

	// find by id, filter by columns
	var sample = samples[util.getRandomInt(0, 50 - 1)];
	var result = await table.findById(sample.id, { columns: ["id", "sit"] });
	same(result, { id: sample.id, sit: sample.sit });

	// find
	var sample = samples[util.getRandomInt(0, 50 - 1)];
	var result = await table.find({ id: sample.id });
	equal(result.length, 1);
	same(result[0], sample);

	// find -> no result
	var result = await table.find({ not: "found" });
	same(result, []);

	// update
	var sample = samples[util.getRandomInt(10, 50 - 1)];
	await table.update({ id: sample.id }, { lorem: "updated" });
	var result = await table.findById(sample.id);
	equal(result.lorem, "updated");

	// throws when updating a unique column with an existing value
	try {
		await table.update({ id: samples[1].id }, { lorem: "updated" });
		throw Error("show throw");
	} catch (error) {
		ok(error.message.includes("UNIQUE"));
	}

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

tearDown(() => dbFile.delete());
