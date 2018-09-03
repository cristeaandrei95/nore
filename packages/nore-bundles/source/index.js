import { merge } from "@nore/std/object";
import Bundle from "./Bundle.js";

const getConfigPath = options =>
	`${options.path}/config/${options.handle}.${options.mode}`;

export default options => nore => {
	const cache = new Set();

	nore.plug("bundles", {
		cache,

		async add(options, defaults) {
			options.path = nore.path;
			options.mode = nore.mode;

			const config = await nore.load(getConfigPath(options));
			const bundle = new Bundle(options, merge(defaults, config));

			await nore.emit("bundles:add", bundle);

			cache.add(bundle);
		},
	});
};
