import { test } from "tap";
import PM from "../source";

test(".start()", ({ end, plan, ok }) => {
	plan(3);

	const bin = process.execPath;
	const file = `${__dirname}/samples/simple.js`;
	const pm = new PM([bin, file]);

	pm.on("spawn", process => {
		ok(true, "should spawn");
	});

	pm.on("exit", (code, signal) => {
		ok(true, "should exit");
	});

	pm.on("stop", () => {
		ok(true, "should stop");
	});

	pm.start();
});

test(".stop()", ({ end, plan, ok }) => {
	plan(3);

	const bin = process.execPath;
	const file = `${__dirname}/samples/crash.js`;
	const pm = new PM([bin, file], { restartLimit: 2, restartDelay: 10 });

	let spawned = 0;

	pm.on("spawn", () => {
		ok(spawned++ < 1, "only spawn once");
	});

	pm.on("stop", () => {
		ok(pm.status === "stopped");
		ok(true, "should stop");
	});

	pm.start().then(() => {
		setImmediate(() => {
			pm.stop();
		});
	});
});

test(".stop() on spawn event", ({ end, plan, ok }) => {
	plan(2);

	const bin = process.execPath;
	const file = `${__dirname}/samples/crash.js`;
	const pm = new PM([bin, file], { restartLimit: 2, restartDelay: 10 });

	let spawned = 0;

	pm.on("spawn", () => {
		ok(spawned++ < 1, "only spawn once");
		pm.stop();
	});

	pm.on("stop", () => {
		ok(true, "should stop");
	});

	pm.start();
});

test(".stop() on spawn event in next event loop", ({ end, plan, ok }) => {
	plan(2);

	const bin = process.execPath;
	const file = `${__dirname}/samples/crash.js`;
	const pm = new PM([bin, file], { restartLimit: 2, restartDelay: 10 });

	let spawned = 0;

	pm.on("spawn", () => {
		ok(spawned++ < 1, "only spawn once");
		setImmediate(() => {
			pm.stop();
		});
	});

	pm.on("stop", () => {
		ok(true, "should stop");
	});

	pm.start();
});

test(".start(), .stop(), .start()", ({ end, plan, ok }) => {
	plan(6);

	const bin = process.execPath;
	const file = `${__dirname}/samples/crash.js`;
	const pm = new PM([bin, file], { restartLimit: 1, restartDelay: 10 });

	let spawned = 0;

	pm.on("spawn", () => {
		ok(++spawned <= 4, "4 spawns");
	});

	pm.once("stop", () => {
		pm.start();

		pm.on("stop", () => {
			ok(true, "should stop");
		});

		ok(true, "should stop");
	});

	pm.start();
});

test(".restart()", ({ end, plan, ok }) => {
	plan(2);

	const bin = process.execPath;
	const file = `${__dirname}/samples/crash.js`;
	const pm = new PM([bin, file]);

	let spawned = 0;

	pm.on("spawn", () => {
		ok(++spawned <= 2, "2 spawns");
	});

	pm.start().then(() => pm.restart());
});

test("restarts", ({ end, plan, ok }) => {
	plan(7);

	const bin = process.execPath;
	const file = `${__dirname}/samples/simple.js`;
	const pm = new PM([bin, file], { restartLimit: 2, restartDelay: 10 });

	pm.on("spawn", process => {
		ok(true, "should spawn");
	});

	pm.on("exit", (code, signal) => {
		ok(true, "should exit");
	});

	pm.on("stop", () => {
		ok(true, "should stop");
	});

	pm.start();
});

test("kill right away", ({ end, plan, ok }) => {
	plan(3);

	const bin = process.execPath;
	const file = `${__dirname}/samples/crash.js`;
	const pm = new PM([bin, file], { restartLimit: 1, restartDelay: 10 });

	let spawned = 0;

	pm.on("spawn", () => {
		ok(spawned++ < 2, "2 spawns");
	});

	pm.on("stop", () => {
		ok(true, "should stop");
	});

	pm.start();
	process.kill(pm.process.pid);
});

test("kill running should mark it crashed", ({ end, plan, ok }) => {
	plan(5);

	const bin = process.execPath;
	const file = `${__dirname}/samples/crash.js`;
	const pm = new PM([bin, file], { restartLimit: 1, restartDelay: 10 });

	let spawned = 0;

	pm.on("spawn", () => {
		ok(spawned++ < 2, "2 spawns");

		setImmediate(() => {
			process.kill(pm.process.pid);
		});
	});

	pm.on("stop", () => {
		ok(true, "should stop");
		ok(spawned == 2, "spawned twice");
		ok(pm.status == "crashed");
	});

	pm.start();
});
