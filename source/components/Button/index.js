import React, { Component } from "react";
import $ from "./style.css";

const apply = (source, target, list) => {
	for (const key of list) {
		target[key] = source[key] || null;
	}
};

const isLink = el =>
	el && el.type && (el.type === "a" || el.type.name === "Link");

const fields = ["id", "className", "style"];
const variants = ["default", "plain", "flat", "outlined", "raised"];
const sizes = ["small", "large"];
const states = ["active", "focus"];
const modifiers = ["round", "disabled", "flexible"];
const styles = ["primary", "secondary", "accent", "positive", "negative"];
const events = ["onClick", "onBlur", "onFocus"];

export default class Button extends Component {
	isSet = key => this.props[key];

	classes() {
		const $variants = variants.filter(this.isSet);

		if (!$variants.length) $variants.push("default");

		return $(
			$variants,
			sizes.filter(this.isSet),
			states.filter(this.isSet),
			styles.filter(this.isSet),
			modifiers.filter(this.isSet)
		);
	}

	render({ children, label, disabled }, state) {
		const attrs = {};

		// add basic attributes
		apply(this.props, attrs, fields);

		// add events
		if (!disabled) {
			apply(this.props, attrs, events);
		}

		// join CSS classes
		attrs.className += this.classes();

		if (isLink(children)) {
			return React.cloneElement(children, attrs);
		}

		return React.createElement("button", attrs, label || children);
	}
}
