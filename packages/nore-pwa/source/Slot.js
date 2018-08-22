import React, { Component } from "react";
import { createPortal } from "react-dom";

export default class Slot extends Component {
	state = { isMounted: false };

	componentDidMount() {
		this.setState({ isMounted: true });
	}

	render({ children, id }, { isMounted }) {
		if (!isMounted) return null;

		// slots are prefixed with "slot_" to prevent conflicts
		const selector = "slot_" + id;
		const container = document.getElementById(selector);

		if (!container) {
			throw new Error("Invalid slot ID: " + id);
		}

		return createPortal(children, container);
	}
}
