import { test, only } from "tap";
import build from "../source";

test("select", ({ end, equal, same }) => {
	var example = {
		type: "select",
		table: "users",
		count: "*",
		where: { county: "Harris" },
	};
	var expected = {
		sql: `SELECT COUNT(*) FROM "users" WHERE "county" == ?`,
		values: ["Harris"],
	};

	same(build(example), expected);

	end();
});
