import { test } from "tap";
import addPath from "../source/addPath.js";

test("add routes", ({ end, same, throws }) => {
	const branch = {
		segment: "/",
		children: []
	};

	addPath("/foo", "foo", branch);

	same(
		branch,
		{
			segment: "/",
			children: [
				{
					segment: "foo",
					literal: "foo",
					key: undefined,
					isWildcard: false,
					isOptional: false,
					children: [],
					data: "foo"
				}
			]
		},
		"add /foo"
	);

	addPath("/lorem", "lorem", branch);

	same(
		branch,
		{
			segment: "/",
			children: [
				{
					segment: "foo",
					literal: "foo",
					key: undefined,
					isWildcard: false,
					isOptional: false,
					children: [],
					data: "foo"
				},
				{
					segment: "lorem",
					literal: "lorem",
					key: undefined,
					isWildcard: false,
					isOptional: false,
					children: [],
					data: "lorem"
				}
			]
		},
		"add /lorem"
	);

	addPath("/foo/{bar}/baz", "baz", branch);

	same(
		branch,
		{
			segment: "/",
			children: [
				{
					segment: "foo",
					literal: "foo",
					key: undefined,
					isWildcard: false,
					isOptional: false,
					children: [
						{
							segment: "{bar}",
							literal: undefined,
							key: "bar",
							isWildcard: false,
							isOptional: false,
							children: [
								{
									segment: "baz",
									literal: "baz",
									key: undefined,
									isWildcard: false,
									isOptional: false,
									children: [],
									data: "baz"
								}
							]
						}
					],
					data: "foo"
				},
				{
					segment: "lorem",
					literal: "lorem",
					key: undefined,
					isWildcard: false,
					isOptional: false,
					children: [],
					data: "lorem"
				}
			]
		},
		"add /foo/{bar}/baz"
	);

	addPath("/foo/bar/{baz?}", "baz", branch);

	same(
		branch,
		{
			segment: "/",
			children: [
				{
					segment: "foo",
					literal: "foo",
					key: undefined,
					isWildcard: false,
					isOptional: false,
					children: [
						{
							segment: "bar",
							literal: "bar",
							key: undefined,
							isWildcard: false,
							isOptional: false,
							data: "baz",
							children: [
								{
									segment: "{baz?}",
									literal: undefined,
									key: "baz",
									isWildcard: false,
									isOptional: true,
									children: [],
									data: "baz"
								}
							]
						},
						{
							segment: "{bar}",
							literal: undefined,
							key: "bar",
							isWildcard: false,
							isOptional: false,
							children: [
								{
									segment: "baz",
									literal: "baz",
									key: undefined,
									isWildcard: false,
									isOptional: false,
									children: [],
									data: "baz"
								}
							]
						}
					],
					data: "foo"
				},
				{
					segment: "lorem",
					literal: "lorem",
					key: undefined,
					isWildcard: false,
					isOptional: false,
					children: [],
					data: "lorem"
				}
			]
		},
		"add /foo/bar/{baz?}"
	);

	// "bar" segment already has a "data"
	// set prevent route overwrite
	throws(() => {
		addPath("/foo/bar", "error", branch);
	}, "throw if paths already exists");

	throws(() => {
		addPath("/foo/bar/{yoko?}", "error", branch);
	}, "throw if path already exists with optional flag");

	end();
});
