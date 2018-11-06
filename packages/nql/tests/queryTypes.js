import { test, only } from "tap";
import build from "../source";

test("insert", ({ end, equal, same }) => {
	end();
});

// test("select", ({ end, equal, same }) => {
// 	var example = {
// 		type: "update",
// 		table: "users",
// 		count: "*",
// 		where: { county: "Harris" },
// 	};
// 	var expected = [
// 		`SELECT COUNT(*) FROM "users" WHERE "county" == ?`,
// 		["Harris"],
// 	];

// 	same(build(example), expected);
// 	end();
// });
