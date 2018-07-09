import { test } from "tap";
import parse from "../source/parse.js";

test("path to segments", ({ end, same }) => {
	const cases = [
		{
			path: "/foo",
			expected: [
				{
					segment: "foo",
					literal: "foo",
					key: undefined,
					isOptional: false,
					isWildcard: false,
				},
			],
		},
		{
			path: "/{foo}",
			expected: [
				{
					segment: "{foo}",
					literal: undefined,
					key: "foo",
					isOptional: false,
					isWildcard: false,
				},
			],
		},
		{
			path: "/{foo*}",
			expected: [
				{
					segment: "{foo*}",
					literal: undefined,
					key: "foo",
					isOptional: false,
					isWildcard: true,
				},
			],
		},
		{
			path: "/foo/bar",
			expected: [
				{
					segment: "foo",
					literal: "foo",
					key: undefined,
					isOptional: false,
					isWildcard: false,
				},
				{
					segment: "bar",
					literal: "bar",
					key: undefined,
					isOptional: false,
					isWildcard: false,
				},
			],
		},
		{
			path: "/foo/{bar}",
			expected: [
				{
					segment: "foo",
					literal: "foo",
					key: undefined,
					isOptional: false,
					isWildcard: false,
				},
				{
					segment: "{bar}",
					literal: undefined,
					key: "bar",
					isOptional: false,
					isWildcard: false,
				},
			],
		},
		{
			path: "/foo/{bar?}",
			expected: [
				{
					segment: "foo",
					literal: "foo",
					key: undefined,
					isOptional: false,
					isWildcard: false,
				},
				{
					segment: "{bar?}",
					literal: undefined,
					key: "bar",
					isOptional: true,
					isWildcard: false,
				},
			],
		},
		{
			path: "/foo/{bar}/baz",
			expected: [
				{
					segment: "foo",
					literal: "foo",
					key: undefined,
					isOptional: false,
					isWildcard: false,
				},
				{
					segment: "{bar}",
					literal: undefined,
					key: "bar",
					isOptional: false,
					isWildcard: false,
				},
				{
					segment: "baz",
					literal: "baz",
					key: undefined,
					isOptional: false,
					isWildcard: false,
				},
			],
		},
		{
			path: "/{foo}/bar/{baz*}",
			expected: [
				{
					segment: "{foo}",
					literal: undefined,
					key: "foo",
					isOptional: false,
					isWildcard: false,
				},
				{
					segment: "bar",
					literal: "bar",
					key: undefined,
					isOptional: false,
					isWildcard: false,
				},
				{
					segment: "{baz*}",
					literal: undefined,
					key: "baz",
					isOptional: false,
					isWildcard: true,
				},
			],
		},
	];

	cases.forEach(({ path, expected }) => {
		same(parse(path), expected, path);
	});

	end();
});
