import window from "@nore/std/global";

const listeners = [];

const history = {
	onChange: new Set(),

	add(path, state) {
		window.history.pushState(state, "", path);
	},

	set(path, state) {
		window.history.replaceState(state, "", path);
	},

	next() {
		window.history.go(1);
	},

	previous() {
		window.history.go(-1);
	},

	listen(handler) {
		listeners.push(handler);
	},
};

if (IN_BROWSER) {
	window.addEventListener("popstate", event => {
		for (const handler of listeners) {
			// stop handling events if the event is canceled
			if (event.cancelBubble) break;

			handler(event.state, event);
		}
	});
}

export default history;
