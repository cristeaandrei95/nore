import { test } from "tap";
import { randomBytes } from "crypto";
import SQLite from "../source";

const random = n => randomBytes(n - 1).toString("hex");
const genTableName = () => "t" + random(7);

const db = new SQLite({
	file: `${__dirname}/samples/test.sqlite`,
});

test("table", async ({ end, equal, same, ok, throws }) => {
	const tableName = genTableName();
	const table = db.table(tableName);

	await table.create({
		id: { type: "TEXT" },
		foo: { type: "TEXT" },
		bar: { type: "TEXT" },
	});

	var result = await table.insert([
		{ foo: "first", bar: random(8), id: random(4) },
		{ foo: "second", bar: random(8), id: random(4) },
		{ foo: "third", bar: random(8), id: random(4) },
		{ foo: "fourth", bar: random(8), id: random(4) },
		{ foo: "fifth", bar: random(8), id: random(4) },
	]);

	equal(result.changes, 5);

	const records = await table.find({ $like: { foo: "%i%" } });
	const second = await table.findOne({ foo: { $like: "%con%" } });
	const third = await table.findOne({ foo: "third" });
	const secondById = await table.findById(second.id);

	equal(records.length, 3);
	equal(records[0].foo, "first");
	equal(second.foo, "second");
	equal(secondById.foo, "second");
	equal(third.foo, "third");

	var result = await table.update(
		{ $like: { foo: "%i%" } },
		{ bar: "updated" }
	);
	equal(result.changes, 3);

	const updates = await table.find({ $like: { foo: "%i%" } });
	same(updates.map(r => r.bar), ["updated", "updated", "updated"]);

	var { changes } = await table.remove({ bar: "updated" });

	equal(changes, 3);

	const newName = genTableName();
	await table.rename(newName);

	equal(table.name, newName);
	ok(tableName !== newName);

	await table.drop();
	throws(() => table.name);

	end();
});
