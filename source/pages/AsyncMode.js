import React, { Timeout } from "react";
import loadable from "loadable-components";

const toLoad = () =>
	import("./World").then(
		World => new Promise(resolve => setTimeout(() => resolve(World), 500))
	);

const AsyncWorld = loadable(toLoad, { asyncMode: true });

export default () => (
	<b>
		shit works like a boss <AsyncWorld />
	</b>
);
