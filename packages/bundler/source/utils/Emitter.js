// a promise based event emitter
export default class Emitter {
	constructor() {
		// store event handlers
		this._events = new Map();
		this._eventsOnce = new Map();
	}

	on(event, handler) {
		const { _events } = this;

		if (!_events.has(event)) {
			_events.set(event, new Set());
		}

		_events.get(event).add(handler);
	}

	once(event, handler) {
		const { _eventsOnce } = this;

		if (!_eventsOnce.has(event)) {
			_eventsOnce.set(event, new Set());
		}

		_eventsOnce.get(event).add(handler);
	}

	off(event, handler) {
		const { _events, _eventsOnce } = this;

		if (_events.has(event)) {
			return _events.get(event).delete(handler);
		}

		if (_eventsOnce.has(event)) {
			return _eventsOnce.get(event).delete(handler);
		}
	}

	emit(event, ...args) {
		const { _events, _eventsOnce } = this;
		const handlers = [];

		if (_events.has(event)) {
			for (const handler of _events.get(event)) {
				handlers.push(handler(...args));
			}
		}

		if (_eventsOnce.has(event)) {
			for (const handler of _eventsOnce.get(event)) {
				handlers.push(handler(...args));
			}

			// reset event store once events are called
			_eventsOnce.set(event, new Set());
		}

		return Promise.all(handlers);
	}
}
