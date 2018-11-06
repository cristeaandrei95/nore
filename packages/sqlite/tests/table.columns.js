import { test, tearDown } from "tap";
import { rndInt, rndStr } from "./utils";
import getFixtures from "./fixtures";

const { dbFile, db, tableName, columns, samples } = getFixtures(50);

tearDown(() => dbFile.delete());

test("table.columns", async ({ end, equal, same, ok, throws }) => {
	const table = db.table(tableName);

	// create table and insert sample data
	await table.create(columns);
	await table.insert(samples);

	// get columns
	var result = await table.columns.getAll();
	same(result.map(c => c.name), ["id", "lorem", "ipsum", "sit"]);

	// get columns that are unique
	var result = await table.columns.getAll({ isUnique: true });
	same(result, ["lorem", "sit"]);

	// has column
	equal(await table.columns.has("boo"), false);
	equal(await table.columns.has("lorem"), true);

	// get column
	same(await table.columns.get("id"), {
		name: "id",
		type: "text",
		default: null,
		isNullable: false,
		isPrimaryKey: true,
		isUnique: true,
	});

	// add a column
	await table.columns.set({ name: "dolor", type: "text" });

	var result = await table.columns.getAll();
	same(result.map(c => c.name), ["id", "lorem", "ipsum", "sit", "dolor"]);

	// update a column
	await table.columns.set({ name: "dolor", type: "real", isUnique: true });

	var result = await table.columns.get("dolor");
	equal(result.type, "real");
	equal(result.isUnique, true);

	// rename column
	await table.columns.rename("dolor", "amet");

	var result = await table.columns.getAll();
	same(result.map(c => c.name), ["id", "lorem", "ipsum", "sit", "amet"]);

	// delete a column
	await table.columns.delete("lorem");

	var result = await table.columns.getAll();
	same(result.map(c => c.name), ["id", "ipsum", "sit", "amet"]);

	var result = await table.columns.getAll({ isUnique: true });
	same(result, ["sit", "amet"]);

	end();
});
