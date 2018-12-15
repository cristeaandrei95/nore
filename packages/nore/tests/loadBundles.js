import { test, only } from "tap";
import loadBundles from "../source/core/loadBundles";

test("loadBundles", async ({ end, ok, equal, same }) => {
	const path = `${__dirname}/samples`;
	const mode = "development";
	const bundles = await loadBundles({ path, mode });

	same(bundles.map(({ handle }) => handle), ["client", "server"]);
	equal(bundles[0].path, path);
	equal(bundles[0].mode, mode);

	end();
});
