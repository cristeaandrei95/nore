import { test, tearDown } from "tap";
import { rndInt, rndStr } from "./utils";
import getFixtures from "./fixtures";

const { dbFile, db, tableName, columns, samples } = getFixtures(50);

tearDown(() => dbFile.delete());

test("table.indexes", async ({ end, equal, same, ok, throws }) => {
	const table = db.table(tableName);

	// create table
	await table.create(columns);

	// get all indexes
	var result = await table.indexes.getAll();
	equal(result.length, 3);
	same(result.map(e => e.type), ["unique", "unique", "primary_key"]);
	same(result.map(e => e.column).sort(), ["id", "lorem", "sit"].sort());

	// set indexes
	await table.indexes.set("loremindex", "lorem");
	await table.indexes.set("loremipsum", ["lorem", "ipsum"]);
	await table.indexes.set("id");
	var result = await table.indexes.getAll();
	equal(result.length, 7);

	// get index by name
	var result = await table.indexes.get("loremipsum");
	equal(result[0].column, "lorem");
	equal(result[1].column, "ipsum");

	// get index by column name
	var result = await table.indexes.getByColumn("lorem");
	equal(result.length, 3);
	var result = await table.indexes.getByColumn("id");
	equal(result.length, 2);

	// delete index by name
	await table.indexes.delete("id");
	var result = await table.indexes.getByColumn("id");
	equal(result.length, 1);

	// delete index by column
	await table.indexes.deleteByColumn("lorem");
	var result = await table.indexes.getAll();
	equal(result.length, 3);

	end();
});
