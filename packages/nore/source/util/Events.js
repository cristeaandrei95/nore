// a promise based event emitter
export default class Emitter {
	constructor() {
		// store event handlers
		this.$events = new Map();
	}

	on(event, handler) {
		const { $events } = this;

		if (!$events.has(event)) {
			$events.set(event, new Set());
		}

		$events.get(event).add(handler);
	}

	off(event, handler) {
		const { $events } = this;

		if (!$events.has(event)) {
			return $events.get(event).delete(handler);
		}
	}

	emit(event, ...args) {
		const { $events } = this;
		const handlers = [];

		if ($events.has(event)) {
			for (const handler of $events.get(event)) {
				handlers.push(handler(...args));
			}
		}

		return Promise.all(handlers);
	}
}
