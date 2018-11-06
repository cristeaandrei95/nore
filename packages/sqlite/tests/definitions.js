import { test } from "tap";
import * as defs from "../source/utils/definitions.js";

const sample = [
	{ name: "zero", type: "integer" },
	{ name: "one", default: "nomnomnom" },
	{ name: "two", isNullable: false },
	{ name: "three", isPrimaryKey: true },
	{ name: "four", isUnique: true },
	{ name: "five", isAutoIncrement: true },
	{ name: "six", isUnique: true, type: "real" },
];

const expected = [
	`"zero" INTEGER`,
	`"one" TEXT DEFAULT (nomnomnom)`,
	`"two" TEXT NOT NULL`,
	`"three" TEXT PRIMARY KEY NOT NULL`,
	`"four" TEXT`,
	`"five" INTEGER PRIMARY KEY AUTOINCREMENT`,
	`"six" REAL`,
];

test("parse", async ({ end, equal }) => {
	sample.forEach((entry, i) => {
		equal(defs.parse(entry), expected[i]);
	});

	end();
});

test("toSQL", async ({ end, equal }) => {
	const result = defs.toSQL(sample);

	equal(result, `${expected.join(", ")}, UNIQUE (four, six)`);
	end();
});

test("toDefinitions", async ({ end, same }) => {
	same(
		defs.toDefinitions({
			cid: 1,
			name: "foo",
			type: "TEXT",
			notnull: 0,
			dflt_value: null,
			pk: 0,
		}),
		{
			name: "foo",
			type: "text",
			default: null,
			isNullable: true,
			isPrimaryKey: false,
			isUnique: false,
		}
	);

	same(
		defs.toDefinitions({
			cid: 1,
			name: "id",
			type: "integer",
			notnull: 1,
			dflt_value: null,
			pk: 1,
		}),
		{
			name: "id",
			type: "integer",
			default: null,
			isNullable: false,
			isPrimaryKey: true,
			isUnique: true,
		}
	);

	end();
});
