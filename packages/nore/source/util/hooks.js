import { SyncHook, AsyncSeriesHook } from "tapable";

export class HookSync extends SyncHook {
	constructor(...args) {
		super(args);
	}
	add(plugin, handler) {
		this.tap(plugin, handler);
	}
}

export class HookAsync extends AsyncSeriesHook {
	constructor(...args) {
		super(args);
	}
	add(plugin, handler) {
		this.tapPromise(plugin, handler);
	}
}
