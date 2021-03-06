import React, { Component } from "react";
import history from "./utils/history";
import store from "./store";
import Scope from "./Scope";

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

		// add current app state to browser history
		history.set(store.path, store.data);

		// set title on initial load
		this.setTitle(this.state);

		// hook into store updates
		store.on("update", this.onUpdate);
		store.on("title", this.setTitle);

		// set loaded class, removing loading
		container.className = "is_loaded";
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

	render({ children, className, style }, state) {
		return (
			<b className={className} style={style}>
				{/* TODO: add more slots: stacks, modals, etc */}
				<b id="slot_application" />

				<Scope.Root context={store} route={state.path}>
					{children}
				</Scope.Root>
			</b>
		);
	}
}
