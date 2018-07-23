import React, { Component } from "react";
import $ from "./style.css";

const types = ["default", "ghost"];
const sizes = ["small", "large"];
const states = ["active", "focus", "disabled"];
const modifiers = ["round"];

const isLink = el =>
	el && el.type && (el.type === "a" || el.type.name === "Link");

export default class Button extends Component {
	isSet = key => this.props[key];

	classes() {
		const type = types.filter(this.isSet);
		const size = sizes.filter(this.isSet);
		const state = states.filter(this.isSet);
		const modifier = modifiers.filter(this.isSet);

		if (!type.length) type.push("default");

		return $(type, size, state, modifier);
	}

	render({ onClick, label, children }, state) {
		const attrs = {
			className: this.classes(),
			onClick: onClick,
		};

		if (isLink(children)) {
			return React.cloneElement(children, attrs);
		}

		return React.createElement("button", attrs, label || children);
	}
}
