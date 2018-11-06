import { test, only } from "tap";
import build from "../source";
import queryTypes from "../source/queryTypes";

test("select", ({ end, equal, same }) => {
	const result = build({
		type: "select",
		table: "demo",
		count: "*",
		where: { lorem: "ipsum" },
	});
	const expected = [
		`SELECT COUNT(*) FROM "demo" WHERE "lorem" == ?`,
		["ipsum"],
	];

	same(result, expected);
	end();
});

test("insert", ({ end, equal, same }) => {
	const result = build({
		type: "insert",
		table: "foo",
		values: { foo: "bar", lorem: null, ipsum: 25 },
	});

	const expected = [
		'INSERT INTO "foo" ("foo", "lorem", "ipsum") VALUES (?, NULL, ?)',
		["bar", 25],
	];

	same(result, expected);
	end();
});

test("update", ({ end, equal, same }) => {
	const result = build({
		type: "update",
		table: "demo",
		set: { foo: "bar", lorem: null, ipsum: 25 },
	});

	const expected = [
		`UPDATE "demo" SET "foo" = ?, "lorem" = NULL, "ipsum" = ?`,
		["bar", 25],
	];

	same(result, expected);
	end();
});

test("delete", ({ end, equal, same }) => {
	const result = build({
		type: "delete",
		table: "demo",
		where: { lorem: "ipsum" },
	});

	const expected = [`DELETE FROM "demo" WHERE "lorem" == ?`, ["ipsum"]];

	same(result, expected);
	end();
});
