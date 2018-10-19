import { test, only } from "tap";
import build from "../source";

const getBuild = where => build({ type: "select", table: "sample", where });
const getSample = sql => `SELECT * FROM sample${sql && ` WHERE ${sql}`}`;
const forEach = (cases, handler) =>
	cases.forEach(({ query, sql, values }) =>
		handler({ sql: getSample(sql), values }, getBuild(query))
	);

test("$is", ({ end, equal, same }) => {
	const cases = [
		{
			query: { foo: "bar" },
			sql: `foo == ?`,
			values: ["bar"],
		},
		{
			query: { foo: "bar", beep: "Boop" },
			sql: `foo == ? AND beep == ?`,
			values: ["bar", "Boop"],
		},
		{
			query: { foo: { $is: ["bar", "baz", null] } },
			sql: `foo == ? AND foo == ? AND foo IS NULL`,
			values: ["bar", "baz"],
		},
		{
			query: { isAwesome: true },
			sql: `isAwesome IS TRUE`,
			values: [],
		},
		{
			query: { isAwesome: false },
			sql: `isAwesome IS FALSE`,
			values: [],
		},
		{
			query: { isAwesome: null },
			sql: `isAwesome IS NULL`,
			values: [],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

test("$null", ({ end, equal, same }) => {
	const cases = [
		{
			query: { foo: { $null: true } },
			sql: `foo IS NULL`,
			values: [],
		},
		{
			query: { foo: { $null: false } },
			sql: `foo IS NOT NULL`,
			values: [],
		},
		{
			query: { $null: ["foo", "bar"] },
			sql: `foo IS NULL AND bar IS NULL`,
			values: [],
		},
		{
			query: { $not: { $null: ["foo", "bar"] } },
			sql: `foo IS NOT NULL AND bar IS NOT NULL`,
			values: [],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

test("$gt", ({ end, equal, same }) => {
	const cases = [
		{
			query: { foo: { $gt: 25 } },
			sql: `foo > ?`,
			values: [25],
		},
		{
			query: { $gt: { id: 25 } },
			sql: `id > ?`,
			values: [25],
		},
		{
			query: { $gt: { id: 25, beep: "Boop" } },
			sql: `id > ? AND beep > ?`,
			values: [25, "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

test("$gte", ({ end, equal, same }) => {
	const cases = [
		{
			query: { foo: { $gte: 25 } },
			sql: `foo >= ?`,
			values: [25],
		},
		{
			query: { $gte: { id: 25 } },
			sql: `id >= ?`,
			values: [25],
		},
		{
			query: { $gte: { id: 25, beep: "Boop" } },
			sql: `id >= ? AND beep >= ?`,
			values: [25, "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

test("$lt", ({ end, equal, same }) => {
	const cases = [
		{
			query: { foo: { $lt: 25 } },
			sql: `foo < ?`,
			values: [25],
		},
		{
			query: { $lt: { id: 25 } },
			sql: `id < ?`,
			values: [25],
		},
		{
			query: { $lt: { id: 25, beep: "Boop" } },
			sql: `id < ? AND beep < ?`,
			values: [25, "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

test("$lte", ({ end, equal, same }) => {
	const cases = [
		{
			query: { foo: { $lte: 25 } },
			sql: `foo <= ?`,
			values: [25],
		},
		{
			query: { $lte: { id: 25 } },
			sql: `id <= ?`,
			values: [25],
		},
		{
			query: { $lte: { id: 25, beep: "Boop" } },
			sql: `id <= ? AND beep <= ?`,
			values: [25, "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

test("$like", ({ end, equal, same }) => {
	const cases = [
		{
			query: { foo: { $like: "bar" } },
			sql: `foo LIKE ?`,
			values: ["bar"],
		},
		{
			query: { $like: { foo: "bar", beep: "Boop" } },
			sql: `foo LIKE ? AND beep LIKE ?`,
			values: ["bar", "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

test("$notLike", ({ end, equal, same }) => {
	const cases = [
		{
			query: { foo: { $notLike: "bar" } },
			sql: `foo NOT LIKE ?`,
			values: ["bar"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

// test("$in", ({ end, equal, same }) => {
// 	const cases = [
// 		{
// 			query: { foo: { $in: ["foo", "bar", "baz"] } },
// 			sql: `foo IN (?, ?, ?)`,
// 			values: ["foo", "bar", "baz"],
// 		},
// 		{
// 			query: {
// 				foo: { $in: { type: "select", table: "users", where: { foo: "bar" } } },
// 			},
// 			sql: `foo IN (SELECT * FROM users WHERE foo == ?)`,
// 			values: ["bar"],
// 		},
// 		{
// 			query: { foo: { $in: [] } },
// 			sql: ``,
// 			values: [],
// 		},
// 		{
// 			query: { foo: { $in: ["bar", false, null, undefined, "baz"] } },
// 			sql: `foo IN (?, ?) AND foo IS FALSE AND foo IS NULL`,
// 			values: ["bar", "baz"],
// 		},
// 		{
// 			query: { foo: { $in: [null] } },
// 			sql: `foo IS NULL`,
// 			values: [],
// 		},
// 	];

// 	forEach(cases, (expected, result) => {
// 		equal(expected.sql, result.sql);
// 		same(expected.values, result.values);
// 	});

// 	end();
// });

// test("$nin", ({ end, equal, same }) => {
// 	const cases = [
// 		{
// 			query: { foo: { $nin: ["foo", "bar", "baz"] } },
// 			sql: `foo NOT IN (?, ?, ?)`,
// 			values: ["foo", "bar", "baz"],
// 		},
// 		{
// 			query: { foo: { $nin: ["bar", false, null, undefined, "baz"] } },
// 			sql: `foo NOT IN (?, ?) AND foo IS NOT FALSE AND foo IS NOT NULL`,
// 			values: ["bar", "baz"],
// 		},
// 	];

// 	forEach(cases, (expected, result) => {
// 		equal(expected.sql, result.sql);
// 		same(expected.values, result.values);
// 	});

// 	end();
// });

test("$or", ({ end, equal, same }) => {
	const cases = [
		{
			query: { $or: { foo: 25, beep: "Boop" } },
			sql: `foo == ? OR beep == ?`,
			values: [25, "Boop"],
		},
		{
			query: { $or: { foo: { $is: "bar" }, beep: { $is: "Boop" } } },
			sql: `foo == ? OR beep == ?`,
			values: ["bar", "Boop"],
		},
		{
			query: { $or: { beep: { $is: ["bar", "Boop"] } } },
			sql: `beep == ? OR beep == ?`,
			values: ["bar", "Boop"],
		},
		{
			query: { $or: { beep: ["bar", "Boop"] } },
			sql: `beep == ? OR beep == ?`,
			values: ["bar", "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

test("$not", ({ end, equal, same }) => {
	const cases = [
		{
			query: { foo: { $not: "bar" } },
			sql: `foo != ?`,
			values: ["bar"],
		},
		{
			query: { $not: { foo: "bar", beep: "Boop", nop: null } },
			sql: `foo != ? AND beep != ? AND nop IS NOT NULL`,
			values: ["bar", "Boop"],
		},
		{
			query: { foo: { $not: ["bar", "baz", null] } },
			sql: `foo != ? AND foo != ? AND foo IS NOT NULL`,
			values: ["bar", "baz"],
		},
		{
			query: { $not: { isAwesome: true } },
			sql: `isAwesome IS NOT TRUE`,
			values: [],
		},
		{
			query: { $not: { isAwesome: false } },
			sql: `isAwesome IS NOT FALSE`,
			values: [],
		},
		{
			query: { $not: { isAwesome: null } },
			sql: `isAwesome IS NOT NULL`,
			values: [],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});

test("$sql", ({ end, equal, same }) => {
	const cases = [
		{
			query: { $sql: ["foo == ? OR beep == ?", "bar", "Boop"] },
			sql: `foo == ? OR beep == ?`,
			values: ["bar", "Boop"],
		},
		{
			query: { $sql: "foo IS NOT FALSE" },
			sql: `foo IS NOT FALSE`,
			values: [],
		},
	];

	forEach(cases, (expected, result) => {
		equal(expected.sql, result.sql);
		same(expected.values, result.values);
	});

	end();
});
