import { set, get, merge } from "@nore/std/object";

export default class Store {
	constructor(data = {}) {
		this.data = data;
		this.events = {};
	}

	set(path, value) {
		set(path.split("/"), value, this.data);

		this.emit(path, this.data, value);
	}

	get(path) {
		return get(path.split("."), this.data);
	}

	update(update) {
		this.data = merge(this.data, update);

		this.emit("update", this.data, update);
	}

	on(event, handler) {
		const events = this.events[event] || (this.events[event] = []);

		events.push(handler);
	}

	off(event, handler) {
		const events = this.events[event];

		if (!events) return;

		events.splice(events.indexOf(handler) >>> 0, 1);
	}

	emit(event, a, b, c) {
		const handlers = this.events[event];

		if (!handlers) return;

		for (const handler of handlers) {
			handler(a, b, c);
		}
	}
}
