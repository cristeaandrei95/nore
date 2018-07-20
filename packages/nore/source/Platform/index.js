import { isArray } from "@nore/std/assert";
import { HookSync, HookAsync } from "../util/hooks.js";
import Bundle from "../Bundle";
import loadBundleConfig from "./loadBundleConfig.js";
import loadVariables from "./loadVariables.js";

export default class Platform {
	constructor(options = {}) {
		// set default settings
		this.path = options.path || process.cwd();
		this.mode = options.mode || "development";
		this.isDebug = options.debug || false;

		// set up bundles
		this.bundles = new Map();
		this.plugins = new Set(options.plugins);

		// set up platform hooks
		this.hooks = {
			bundle: new HookSync("bundle"),
			variables: new HookSync("variables"),
		};
	}

	async loadBundle(bundle, defaults) {
		if (!(bundle instanceof Bundle)) {
			for (const field of ["path", "mode", "variables"]) {
				if (!bundle[field]) {
					bundle[field] = this[field];
				}
			}

			bundle.config = await loadBundleConfig(bundle, defaults);
			bundle = new Bundle(bundle);
		}

		this.hooks.bundle.call(bundle);
		this.bundles.set(bundle.handle, bundle);
	}

	async loadVariables() {
		// load variables `source/variables.toml`
		this.variables = await loadVariables(this.path);

		this.hooks.variables.call(this.variables);
	}

	async loadPlugins(plugins) {
		if (isArray(plugins)) {
			for (const plugin of plugins) {
				this.plugins.add(plugin);
			}
		}

		// initialize plugins
		for (const plugin of this.plugins) {
			if (!plugin.isLoaded) {
				plugin(this);
				plugin.isLoaded = true;
			}
		}
	}
}
