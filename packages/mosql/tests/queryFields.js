import { test, only } from "tap";
import build from "../source";
import queryFields from "../source/queryFields";

test("table", ({ end, equal }) => {
	const table = queryFields.get("table");
	equal(table("foo"), `FROM "foo"`);
	end();
});

test("distinct", ({ end, equal }) => {
	const distinct = queryFields.get("distinct");
	equal(distinct(false), ``);
	equal(distinct(true), `DISTINCT`);
	end();
});

test("ifExists", ({ end, equal }) => {
	const ifExists = queryFields.get("ifExists");
	equal(ifExists(false), ``);
	equal(ifExists(true), `IF EXISTS`);
	end();
});

test("columns", ({ end, equal, same }) => {
	const columns = queryFields.get("columns");

	// array
	equal(columns(["foo", "bar", "baz"]), `"foo", "bar", "baz"`);
	equal(
		columns([{ name: "bar", alias: "rab" }, { name: "baz", alias: "zab" }]),
		`"bar" as "rab", "baz" as "zab"`
	);

	// object
	same(columns({ values: ["foo", "bar", "baz"] }), {
		sql: "?, ?, ?",
		values: ["foo", "bar", "baz"],
	});

	// string
	equal(columns("foo"), `"foo"`);
	equal(columns("*"), `*`);

	end();
});

test("where", ({ end, equal, same }) => {
	const where = queryFields.get("where");

	same(
		where({
			foo: "bar",
			baz: { $in: ["1", "2"] },
		}),
		{
			sql: `WHERE "foo" == ? AND "baz" IN (?, ?)`,
			values: ["bar", "1", "2"],
		}
	);

	end();
});

test("orderBy", ({ end, equal }) => {
	const orderBy = queryFields.get("orderBy");

	equal(orderBy(["foo", "bar"]), `ORDER BY "foo", "bar"`);
	equal(orderBy({ asc: ["foo", "bar"] }), `ORDER BY "foo", "bar" ASC`);
	equal(orderBy({ desc: ["foo", "bar"] }), `ORDER BY "foo", "bar" DESC`);
	equal(orderBy("foo"), `ORDER BY "foo"`);
	equal(orderBy(""), "");
	equal(orderBy([]), "");

	end();
});

test("groupBy", ({ end, equal }) => {
	const groupBy = queryFields.get("groupBy");

	equal(groupBy(["foo", "bar"]), `GROUP BY "foo", "bar"`);
	equal(groupBy("foo"), `GROUP BY "foo"`);
	equal(groupBy([]), "");
	equal(groupBy(""), "");

	end();
});

test("limit", ({ end, equal, same }) => {
	const limit = queryFields.get("limit");

	equal(limit(null), "");
	equal(limit([]), "");
	same(limit(123), { sql: "LIMIT ?", values: ["123"] });
	same(limit("123"), { sql: "LIMIT ?", values: ["123"] });
	same(limit("123ab"), { sql: "LIMIT ?", values: ["123"] });

	end();
});

test("offset", ({ end, equal, same }) => {
	const offset = queryFields.get("offset");

	equal(offset(null), "");
	equal(offset([]), "");
	same(offset(123), { sql: "OFFSET ?", values: ["123"] });
	same(offset("123"), { sql: "OFFSET ?", values: ["123"] });
	same(offset("123ab"), { sql: "OFFSET ?", values: ["123"] });

	end();
});

test("count", ({ end, equal, same }) => {
	const count = queryFields.get("count");

	equal(count(null), "");
	equal(count([]), "");
	equal(count("*"), `COUNT(*)`);
	same(count("123"), { sql: `COUNT(?)`, values: ["123"] });
	same(count(["foo", "bar"]), { sql: `COUNT(?, ?)`, values: ["foo", "bar"] });

	end();
});
