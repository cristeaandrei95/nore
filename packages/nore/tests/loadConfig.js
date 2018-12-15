import { test, only } from "tap";
import loadConfig from "../source/core/loadConfig";

test("loadConfig", async ({ end, ok, equal, same }) => {
	const path = __dirname;
	const config = await loadConfig({ path, isDebug: true });

	equal(config.path, path, "added correct path");
	equal(config.mode, "development", "added correct mode");
	ok(config.plugins.length > 0);
	ok(config.isDebug);

	end();
});

test("loadConfig - external config", async ({ end, equal, same }) => {
	const path = __dirname + "/samples";
	const config = await loadConfig({ path });

	equal(config.path, path, "added correct path");
	equal(config.mode, "testing", "added correct mode");
	equal(
		config.plugins[config.plugins.length - 1](),
		"demo",
		"added external plugins"
	);

	end();
});
