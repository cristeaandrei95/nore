import { test } from "tap";
import build from "../source";
import queryFields from "../source/queryFields";

test("table", ({ end, equal }) => {
	const table = queryFields.get("table");
	equal(table("foo"), "FROM `foo`");
	end();
});

test("columns", ({ end, equal, same }) => {
	const columns = queryFields.get("columns");

	// array
	equal(columns(["foo", "bar", "baz"]), `"foo", "bar", "baz"`);
	equal(
		columns([
			{ name: "foo", alias: "oof" },
			{ name: "bar", alias: "rab" },
			{ name: "baz", alias: "zab" },
		]),
		`"foo" as "oof", "bar" as "rab", "baz" as "zab"`
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
