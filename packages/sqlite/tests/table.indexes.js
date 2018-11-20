import { test, tearDown } from "tap";
import Database from "../source";
import { rndInt, rndStr, getRandomData, getTemporaryFile } from "./utils";

const columns = [
	{ name: "id", type: "text", isPrimaryKey: true },
	{ name: "lorem", type: "text", isUnique: true },
	{ name: "ipsum", type: "real", default: 100 },
	{ name: "sit", type: "integer", isUnique: true },
];

const samples = getRandomData(columns, 50);
const dbFile = getTemporaryFile();
const db = new Database({ file: dbFile.path });

test("table.indexes", async ({ end, equal, same, ok, throws }) => {
	const table = db.table(rndStr());

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

tearDown(() => dbFile.delete());
