import { test } from "tap";
import build from "../source";

test("select", ({ end, equal }) => {
	const cases = [
		{
			query: { type: "select", table: "foo" },
			sql: `SELECT * FROM foo`,
		},
		{
			query: { type: "select", table: "foo", columns: "bar" },
			sql: `SELECT bar FROM foo`,
		},
		{
			query: { type: "select", table: "foo", columns: ["bar", "baz", "bim"] },
			sql: `SELECT bar, baz, bim FROM foo`,
		},
	];

	cases.forEach(c => equal(build(c.query).sql, c.sql));
	end();
});
