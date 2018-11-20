import { test, tearDown } from "tap";
import Database from "../source";
import { rndInt, rndStr, getTemporaryFile, getRandomData } from "./utils";

const columns = [
	{ name: "id", type: "text", isPrimaryKey: true },
	{ name: "lorem", type: "text", isUnique: true },
	{ name: "ipsum", type: "real", default: 100 },
	{ name: "baz", type: "text", foreignKey: ["foo", "bar"] },
];

const samples = getRandomData(columns, 50);
const dbFile = getTemporaryFile();
const db = new Database({ file: dbFile.path });
const table = db.table(rndStr());

test("table.columns", async ({ end, equal, same, ok, throws }) => {
	// create sample table used for foreign key constraint
	db.table("foo").create([{ name: "bar", isPrimaryKey: true }]);

	// create table and insert sample data
	await table.create(columns);
	await table.insert(samples);

	// get columns
	var result = await table.columns.getAll();
	same(result.map(c => c.name), ["id", "lorem", "ipsum", "baz"]);

	// get columns that are unique
	var result = await table.columns.getAll({ isUnique: true });
	same(result, ["lorem"]);

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
	same(result.map(c => c.name), ["id", "lorem", "ipsum", "baz", "dolor"]);

	// update a column
	await table.columns.set({ name: "dolor", type: "real", isUnique: true });

	var result = await table.columns.get("dolor");
	equal(result.type, "real");
	equal(result.isUnique, true);

	// rename column
	await table.columns.rename("dolor", "amet");

	var result = await table.columns.getAll();
	same(result.map(c => c.name), ["id", "lorem", "ipsum", "baz", "amet"]);

	// delete a column
	await table.columns.delete("lorem");

	var result = await table.columns.getAll();
	same(result.map(c => c.name), ["id", "ipsum", "baz", "amet"]);

	var result = await table.columns.getAll({ isUnique: true });
	same(result, ["amet"]);

	end();
});

tearDown(() => dbFile.delete());
