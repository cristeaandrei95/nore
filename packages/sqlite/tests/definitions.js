import { test } from "tap";
import defsToSQL from "../source/utils/defsToSQL.js";
import metaToDefs from "../source/utils/metaToDefs.js";
import parseCreateTableSQL from "../source/utils/parseCreateTableSQL.js";

test("parseCreateTableSQL", ({ end, same }) => {
	var result = parseCreateTableSQL(
		`CREATE TABLE "test" ("id" TEXT PRIMARY KEY NOT NULL, UNIQUE ("id"))`
	);
	var expected = {
		columns: [`"id" TEXT PRIMARY KEY NOT NULL`],
		foreignKeys: [],
		uniques: [`"id"`],
	};
	same(result, expected);

	var result = parseCreateTableSQL(
		`CREATE TABLE "test" ("id" TEXT PRIMARY KEY NOT NULL, FOREIGN KEY ("baz") REFERENCES "foo" ("bar"))`
	);
	var expected = {
		columns: [`"id" TEXT PRIMARY KEY NOT NULL`],
		foreignKeys: [`FOREIGN KEY ("baz") REFERENCES "foo" ("bar")`],
		uniques: [],
	};
	same(result, expected);

	var result = parseCreateTableSQL(
		`CREATE TABLE "test" ("id" TEXT PRIMARY KEY NOT NULL, "lorem" TEXT, "ipsum" REAL DEFAULT 'foo, bar', "sit" INTEGER, "baz" TEXT, FOREIGN KEY ("baz") REFERENCES "foo" ("bar"), FOREIGN KEY ("hop") REFERENCES "foo" ("asd"), FOREIGN KEY ("gre") REFERENCES "foo" ("bvc"), UNIQUE ("lorem", "sit"))`
	);
	var expected = {
		columns: [
			`"id" TEXT PRIMARY KEY NOT NULL`,
			`"lorem" TEXT`,
			`"ipsum" REAL DEFAULT 'foo, bar'`,
			`"sit" INTEGER`,
			`"baz" TEXT`,
		],
		foreignKeys: [
			`FOREIGN KEY ("baz") REFERENCES "foo" ("bar")`,
			`FOREIGN KEY ("hop") REFERENCES "foo" ("asd")`,
			`FOREIGN KEY ("gre") REFERENCES "foo" ("bvc")`,
		],
		uniques: [`"lorem"`, `"sit"`],
	};
	same(result, expected);

	end();
});

test("defsToSQL", async ({ end, equal }) => {
	equal(defsToSQL([{ name: "foo", type: "text" }]), `"foo" TEXT`);
	equal(
		defsToSQL([{ name: "foo", type: "text", isNullable: true }]),
		`"foo" TEXT`
	);

	equal(
		defsToSQL([{ name: "foo", type: "text", default: "lorem" }]),
		`"foo" TEXT DEFAULT 'lorem'`
	);

	equal(
		defsToSQL([{ name: "foo", type: "text", isPrimaryKey: true }]),
		`"foo" TEXT PRIMARY KEY NOT NULL`
	);

	equal(
		defsToSQL([{ name: "foo", type: "integer", isAutoIncrement: true }]),
		`"foo" INTEGER AUTOINCREMENT`
	);

	equal(
		defsToSQL([{ name: "foo", type: "text", isNullable: false }]),
		`"foo" TEXT NOT NULL`
	);

	equal(
		defsToSQL([{ name: "foo", type: "text", isUnique: true }]),
		`"foo" TEXT, UNIQUE ("foo")`
	);

	equal(
		defsToSQL([{ name: "foo", type: "text", isPrimaryKey: ["lorem(ipsum)"] }]),
		`"foo" TEXT PRIMARY KEY NOT NULL`
	);

	equal(
		defsToSQL([{ name: "foo", foreignKey: ["lorem", "ipsum"] }]),
		`"foo" TEXT, FOREIGN KEY ("foo") REFERENCES "lorem" ("ipsum")`
	);

	equal(
		defsToSQL([
			{ name: "foo", type: "text", isPrimaryKey: true },
			{ name: "bar", type: "real", isUnique: true },
			{ name: "baz", type: "text", default: "foobar" },
			{ name: "lorem", type: "integer", foreignKey: ["baz", "sit"] },
			{ name: "ipsum", type: "integer", foreignKey: ["baz", "dolor"] },
		]),
		`"foo" TEXT PRIMARY KEY NOT NULL, "bar" REAL, "baz" TEXT DEFAULT 'foobar', "lorem" INTEGER, "ipsum" INTEGER, FOREIGN KEY ("lorem") REFERENCES "baz" ("sit"), FOREIGN KEY ("ipsum") REFERENCES "baz" ("dolor"), UNIQUE ("bar")`
	);

	// equal(result, `${expected.join(", ")}, UNIQUE (four, six)`);
	end();
});

test("metaToDefs", async ({ end, same }) => {
	same(
		metaToDefs({
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
		metaToDefs({
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
