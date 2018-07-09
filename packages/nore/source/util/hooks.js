import { SyncHook, AsyncSeriesHook } from "tapable";

export class HookSync extends SyncHook {
	add(plugin, handler) {
		this.tap(plugin, handler);
	}
}

export class HookAsync extends AsyncSeriesHook {
	add(plugin, handler) {
		this.tapPromise(plugin, handler);
	}
}
