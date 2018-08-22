import React, { Component } from "react";
import { Slot } from "@nore/pwa";
import $ from "./style.css";

export default class Baseline extends Component {
	state = { isVisible: false };

	toggle = () => {
		this.setState({ isVisible: !this.state.isVisible });
	};

	render(props, { isVisible }) {
		return (
			<Slot id="application">
				<b class={$.toggle} onClick={this.toggle}>
					baseline
				</b>
				{isVisible ? <b class={$.grid} /> : null}
			</Slot>
		);
	}
}
