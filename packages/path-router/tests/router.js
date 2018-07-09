import { test } from "tap";
import Router from "../source";

test("router.match()", ({ end, equal, same }) => {
	const routes = [
		{ path: "/", data: "index" },
		{ path: "/users", data: "users" }
	];

	const router = new Router({ routes });

	router.set("/users/{id}", "users/id");
	router.set("/article/{slug}", "article/slug");

	const cases = [
		{
			path: "/",
			expected: {
				params: {},
				data: "index",
				unmatched: undefined
			}
		},
		{
			path: "/users",
			expected: {
				params: {},
				data: "users",
				unmatched: undefined
			}
		},
		{
			path: "/users/id1234",
			expected: {
				params: { id: "id1234" },
				data: "users/id",
				unmatched: undefined
			}
		},
		{
			path: "/USERS/SeNsItIvE1234",
			expected: {
				params: { id: "SeNsItIvE1234" },
				data: "users/id",
				unmatched: undefined
			}
		},
		{
			path: "/article/The-Best_show",
			expected: {
				params: { slug: "The-Best_show" },
				data: "article/slug",
				unmatched: undefined
			}
		},
		{
			path: "/article/The-Best_show/tag/new",
			expected: {
				params: { slug: "The-Best_show" },
				data: "article/slug",
				unmatched: "tag/new"
			}
		}
	];

	for (const { path, expected } of cases) {
		same(router.match(path), expected, `match: ${path}`);
	}

	end();
});

test("router.get()", ({ end, equal, same }) => {
	const routes = [{ path: "/users/{id}" }];
	const router = new Router({ routes });

	same(router.get("/"), router.root);

	same(
		router.get("/users/id"),
		router.root.children
			.filter(n => n.literal === "users")
			.pop()
			.children.filter(n => n.segment === "{id}")
			.pop()
	);

	equal(router.get("/nothing"), null);

	end();
});
