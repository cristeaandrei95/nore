import { test } from "tap";
import addPath from "../source/addPath.js";
import matchPath from "../source/matchPath.js";

test("match paths", ({ end, equal, same }) => {
	const root = { segment: "/", children: [] };

	addPath("/user/{name}", "web_user", root);
	addPath("/api/users/{id}", "api_users", root);
	addPath("/api/{service}/profile/{id}", "api_profile", root);
	addPath("/article/{category}/{title}/", "web_article", root);

	const cases = [
		{
			path: "/nothing/to/match",
			node: null,
			unmatched: "nothing/to/match"
		},
		{
			path: "/user/john",
			params: { name: "john" },
			data: "web_user"
		},
		{
			path: "/api/users/1234",
			params: { id: "1234" },
			data: "api_users"
		},
		{
			path: "/api/companies/profile/4321",
			params: { id: "4321", service: "companies" },
			data: "api_profile"
		},
		{
			path: "/api/companies/profile/4321/nested/path",
			params: { id: "4321", service: "companies" },
			unmatched: "nested/path",
			data: "api_profile"
		},
		{
			path: "/article/lorem/ipsum/",
			params: { category: "lorem", title: "ipsum" },
			data: "web_article"
		},
		{
			path: "/api/companies/lorem/ipsum",
			params: { service: "companies" },
			unmatched: "lorem/ipsum",
			node: {
				segment: "{service}",
				literal: undefined,
				key: "service",
				isWildcard: false,
				isOptional: false,
				children: [
					{
						segment: "profile",
						literal: "profile",
						key: null,
						isOptional: false,
						isWildcard: false,
						children: [
							{
								segment: "{id}",
								literal: null,
								key: "id",
								isOptional: false,
								isWildcard: false,
								data: "api_profile",
								children: []
							}
						]
					}
				]
			}
		},
		{
			path: "/api/users",
			node: {
				segment: "users",
				literal: "users",
				key: undefined,
				isWildcard: false,
				isOptional: false,
				children: [
					{
						segment: "{id}",
						literal: null,
						key: "id",
						isOptional: false,
						isWildcard: false,
						data: "api_users",
						children: []
					}
				]
			}
		}
	];

	for (const { path, params, unmatched, data, node } of cases) {
		const result = matchPath(path, root);

		if (params !== undefined) same(result.params, params, `${path} - params`);
		if (data !== undefined) equal(result.node.data, data, `${path} - data`);
		if (node !== undefined) same(result.node, node, `${path} - node`);
		equal(result.unmatched, unmatched || null, `${path} - unmatched`);
	}

	end();
});
