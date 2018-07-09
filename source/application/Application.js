import React, { Component } from "react";
import history from "~/util/history";
import store from "./store";
import Scope from "./Scope";
import $ from "./style";

export default class Application extends Component {
	constructor({ state }) {
		super();

		if (state) {
			store.update(state);
		}

		this.state = store.data;
	}

	componentDidMount() {
		const { container } = this.props;

		// set loaded class, removing loading
		container.className = "is_loaded";
		// add current app state to browser history
		history.set(store.path, store.data);

		store.on("update", this.onUpdate);
		store.on("title", this.setTitle);
	}

	componentWillUnmount() {
		store.off("update", this.onUpdate);
	}

	onUpdate = state => {
		this.setState(state);
	};

	setTitle = ({ title }) => {
		document.title = title;
	};

	render({ children }, state) {
		const scope = Object.create(store);

		scope.route = "/";
		scope.matched = [];

		return (
			<b class={$.application}>
				<Scope.Provider value={scope}>{children}</Scope.Provider>
			</b>
		);
	}
}
