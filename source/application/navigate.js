import { parse } from "@nore/std/url";
import { isString } from "@nore/std/assert";
import qs from "query-string";
import history from "./util/history";
import store from "./store";

history.listen(state => {
	store.update(state);
});

function pathToState(path) {
	const url = parse(path);
	const query = qs.parse(url.query);

	return {
		path: url.path,
		query,
		hash: url.hash,
	};
}

export default function navigate(path) {
	const state = isString(path) ? pathToState(path) : path;

	if (!state.title) {
		state.title = store.data.title;
	}

	history.add(state.path, state);
	store.update(state);
}
