import { test, only } from "tap";
import build from "../source";

const subQuery = { type: "select", table: "users", where: { foo: "bar" } };
const sqlSubQuery = `SELECT * FROM users WHERE foo == ?`;

const getBuild = where => build({ type: "select", table: "sample", where });
const getSample = sql => `SELECT * FROM sample${sql && ` WHERE ${sql}`}`;

const forEach = (cases, handler) =>
	cases.forEach(({ where, sql, values }) =>
		handler({ sql: getSample(sql), values }, getBuild(where))
	);

test("$is", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: "bar" },
			sql: `foo == ?`,
			values: ["bar"],
		},
		{
			where: { foo: "bar", beep: "Boop" },
			sql: `foo == ? AND beep == ?`,
			values: ["bar", "Boop"],
		},
		{
			where: { foo: { $is: ["bar", "baz", null] } },
			sql: `foo == ? AND foo == ? AND foo IS NULL`,
			values: ["bar", "baz"],
		},
		{
			where: { isAwesome: true },
			sql: `isAwesome IS TRUE`,
			values: [],
		},
		{
			where: { isAwesome: false },
			sql: `isAwesome IS FALSE`,
			values: [],
		},
		{
			where: { isAwesome: null },
			sql: `isAwesome IS NULL`,
			values: [],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$null", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $null: true } },
			sql: `foo IS NULL`,
			values: [],
		},
		{
			where: { foo: { $null: false } },
			sql: `foo IS NOT NULL`,
			values: [],
		},
		{
			where: { $null: ["foo", "bar"] },
			sql: `foo IS NULL AND bar IS NULL`,
			values: [],
		},
		{
			where: { $not: { $null: ["foo", "bar"] } },
			sql: `foo IS NOT NULL AND bar IS NOT NULL`,
			values: [],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$not", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $not: "bar" } },
			sql: `foo != ?`,
			values: ["bar"],
		},
		{
			where: { $not: { foo: "bar", beep: "Boop", nop: null } },
			sql: `foo != ? AND beep != ? AND nop IS NOT NULL`,
			values: ["bar", "Boop"],
		},
		{
			where: { foo: { $not: ["bar", false, "baz", null] } },
			sql: `foo != ? OR foo != ? OR foo IS NOT FALSE OR foo IS NOT NULL`,
			values: ["bar", "baz"],
		},
		{
			where: { $not: { isAwesome: true } },
			sql: `isAwesome IS NOT TRUE`,
			values: [],
		},
		{
			where: { $not: { isAwesome: false } },
			sql: `isAwesome IS NOT FALSE`,
			values: [],
		},
		{
			where: { $not: { isAwesome: null } },
			sql: `isAwesome IS NOT NULL`,
			values: [],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$or", ({ end, equal, same }) => {
	const cases = [
		{
			where: { $or: { foo: 25, beep: "Boop" } },
			sql: `foo == ? OR beep == ?`,
			values: [25, "Boop"],
		},
		{
			where: { $or: { foo: { $is: "bar" }, beep: { $is: "Boop" } } },
			sql: `foo == ? OR beep == ?`,
			values: ["bar", "Boop"],
		},
		{
			where: { $or: { beep: { $is: ["bar", "Boop"] } } },
			sql: `beep == ? OR beep == ?`,
			values: ["bar", "Boop"],
		},
		{
			where: { $or: { beep: ["bar", "Boop"] } },
			sql: `beep == ? OR beep == ?`,
			values: ["bar", "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$and", ({ end, equal, same }) => {
	const cases = [
		{
			where: { $or: { foo: 25, $and: { bar: 20, baz: 15 } } },
			sql: `foo == ? OR bar == ? AND baz == ?`,
			values: [25, 20, 15],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$gt", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $gt: 25 } },
			sql: `foo > ?`,
			values: [25],
		},
		{
			where: { $gt: { id: 25 } },
			sql: `id > ?`,
			values: [25],
		},
		{
			where: { $gt: { id: 25, beep: "Boop" } },
			sql: `id > ? AND beep > ?`,
			values: [25, "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$gte", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $gte: 25 } },
			sql: `foo >= ?`,
			values: [25],
		},
		{
			where: { $gte: { id: 25 } },
			sql: `id >= ?`,
			values: [25],
		},
		{
			where: { $gte: { id: 25, beep: "Boop" } },
			sql: `id >= ? AND beep >= ?`,
			values: [25, "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$lt", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $lt: 25 } },
			sql: `foo < ?`,
			values: [25],
		},
		{
			where: { $lt: { id: 25 } },
			sql: `id < ?`,
			values: [25],
		},
		{
			where: { $lt: { id: 25, beep: "Boop" } },
			sql: `id < ? AND beep < ?`,
			values: [25, "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$lte", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $lte: 25 } },
			sql: `foo <= ?`,
			values: [25],
		},
		{
			where: { $lte: { id: 25 } },
			sql: `id <= ?`,
			values: [25],
		},
		{
			where: { $lte: { id: 25, beep: "Boop" } },
			sql: `id <= ? AND beep <= ?`,
			values: [25, "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$sql", ({ end, equal, same }) => {
	const cases = [
		{
			where: { $sql: ["foo == ? OR beep == ?", "bar", "Boop"] },
			sql: `foo == ? OR beep == ?`,
			values: ["bar", "Boop"],
		},
		{
			where: { $sql: "foo IS NOT FALSE" },
			sql: `foo IS NOT FALSE`,
			values: [],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$in", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $in: ["bar", null, false, "baz", undefined] } },
			sql: `foo IN (?, ?) OR foo IS NULL OR foo IS FALSE`,
			values: ["bar", "baz"],
		},
		{
			where: { foo: { $in: [null] } },
			sql: `foo IS NULL`,
			values: [],
		},
		{
			where: { foo: { $in: [] } },
			sql: ``,
			values: [],
		},
		{
			where: { foo: { $in: subQuery } },
			sql: `foo IN (${sqlSubQuery})`,
			values: ["bar"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$nin", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $nin: ["foo", "bar", "baz"] } },
			sql: `foo NOT IN (?, ?, ?)`,
			values: ["foo", "bar", "baz"],
		},
		{
			where: { foo: { $nin: ["bar", false, null, undefined, "baz"] } },
			sql: `foo NOT IN (?, ?) OR foo IS NOT FALSE OR foo IS NOT NULL`,
			values: ["bar", "baz"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$like", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $like: "bar" } },
			sql: `foo LIKE ?`,
			values: ["bar"],
		},
		{
			where: { $like: { foo: "bar", beep: "Boop" } },
			sql: `foo LIKE ? AND beep LIKE ?`,
			values: ["bar", "Boop"],
		},
		{
			where: { $or: { $like: { foo: "bar", beep: "Boop" } } },
			sql: `foo LIKE ? OR beep LIKE ?`,
			values: ["bar", "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});

test("$nlike", ({ end, equal, same }) => {
	const cases = [
		{
			where: { foo: { $nlike: "bar" } },
			sql: `foo NOT LIKE ?`,
			values: ["bar"],
		},
		{
			where: { $nlike: { foo: "bar", beep: "Boop" } },
			sql: `foo NOT LIKE ? AND beep NOT LIKE ?`,
			values: ["bar", "Boop"],
		},
	];

	forEach(cases, (expected, result) => {
		equal(result.sql, expected.sql);
		same(result.values, expected.values);
	});

	end();
});
