import { test, only } from "tap";
import queryFields from "../source/queryFields";

test("table", ({ end, equal, same }) => {
	const table = queryFields.get("table");

	equal(table("foo"), `"foo"`);
	equal(table("foo"), `"foo"`);
	equal(table({ name: "foo", as: "bar" }), `"foo" AS "bar"`);

	end();
});

test("columns", ({ end, equal, same }) => {
	const columns = queryFields.get("columns");
	const query = { type: "select" };

	// array
	equal(columns(["foo", "bar"]), `"foo", "bar"`);
	equal(
		columns([{ name: "bar", as: "rab" }, { name: "baz", as: "zab" }]),
		`"bar" as "rab", "baz" as "zab"`
	);

	// string
	equal(columns("foo"), `"foo"`);
	equal(columns("*"), `*`);

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

test("where", ({ end, equal, same }) => {
	const where = queryFields.get("where");

	same(
		where({
			foo: "bar",
			baz: { $in: ["1", "2"] },
		}),
		[`WHERE "foo" == ? AND "baz" IN (?, ?)`, ["bar", "1", "2"]]
	);

	end();
});

test("orderBy", ({ end, equal }) => {
	const orderBy = queryFields.get("orderBy");

	equal(orderBy(["foo", "bar"]), `ORDER BY "foo", "bar"`);
	equal(orderBy({ $asc: ["foo", "bar"] }), `ORDER BY "foo", "bar" ASC`);
	equal(orderBy({ $desc: ["foo", "bar"] }), `ORDER BY "foo", "bar" DESC`);
	equal(
		orderBy({ $asc: ["foo", "bar"], baz: "desc", lorem: "asc" }),
		`ORDER BY "foo", "bar", "lorem" ASC, "baz" DESC`
	);
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
	same(limit(123), ["LIMIT ?", ["123"]]);
	same(limit("123"), ["LIMIT ?", ["123"]]);
	same(limit("123ab"), ["LIMIT ?", ["123"]]);

	end();
});

test("offset", ({ end, equal, same }) => {
	const offset = queryFields.get("offset");

	equal(offset(null), "");
	equal(offset([]), "");
	same(offset(123), ["OFFSET ?", ["123"]]);
	same(offset("123"), ["OFFSET ?", ["123"]]);
	same(offset("123ab"), ["OFFSET ?", ["123"]]);

	end();
});

test("count", ({ end, equal, same }) => {
	const count = queryFields.get("count");

	equal(count(null), "");
	equal(count([]), "");
	equal(count("*"), `COUNT(*)`);
	same(count("foo"), `COUNT("foo")`);
	same(count(["foo", "bar"]), `COUNT("foo", "bar")`);

	end();
});

test("values", ({ end, same }) => {
	const values = queryFields.get("values");

	same(values({ foo: "bar", lorem: "ipsum" }), [
		`("foo", "lorem") VALUES (?, ?)`,
		["bar", "ipsum"],
	]);

	same(values({ foo: "bar", lorem: null, ipsum: 25 }), [
		`("foo", "lorem", "ipsum") VALUES (?, NULL, ?)`,
		["bar", 25],
	]);

	end();
});

test("set", ({ end, same }) => {
	const set = queryFields.get("set");

	same(set({ foo: "bar" }), [`SET "foo" = ?`, ["bar"]]);
	same(set({ foo: "bar", lorem: null, ipsum: 25 }), [
		`SET "foo" = ?, "lorem" = NULL, "ipsum" = ?`,
		["bar", 25],
	]);

	end();
});
