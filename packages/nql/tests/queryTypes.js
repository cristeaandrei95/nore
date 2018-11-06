import { test, only } from "tap";
import build from "../source";
import queryTypes from "../source/queryTypes";

test("select", ({ end, equal, same }) => {
	const result = build({
		type: "select",
		table: "users",
		count: "*",
		where: { county: "Harris" },
	});
	const expected = [
		`SELECT COUNT(*) FROM "users" WHERE "county" == ?`,
		["Harris"],
	];

	same(result, expected);
	end();
});

test("insert", ({ end, equal, same }) => {
	const result = build({
		type: "insert",
		table: "foo",
		values: { foo: "one", bar: "two" },
		where: { age: { $between: [21, 35] } },
	});

	const expected = [
		'INSERT INTO "foo" ("foo", "bar") VALUES (?, ?) WHERE "age" BETWEEN ? AND ?',
		["one", "two", 21, 35],
	];

	same(result, expected);
	end();
});
