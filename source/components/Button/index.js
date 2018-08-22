import React, { Component, createElement, cloneElement } from "react";
import $ from "./style.css";

const apply = (source, target, list) => {
	for (const key of list) {
		target[key] = source[key] || null;
	}
};

const isLink = el =>
	el && el.type && (el.type === "a" || el.type.name === "Link");

const variants = ["default", "plain", "outlined", "flat", "raised"];
const sizes = ["small", "medium", "large", "xlarge"];
const states = ["hover", "active", "focus"];
const shapes = ["sharp", "round", "pill"];
const modifiers = ["disabled"];
const styles = ["primary", "secondary", "accent", "positive", "negative"];

export default class Button extends Component {
	isSet = key => this.props[key];

	classes() {
		const $variants = variants.filter(this.isSet);
		const $sizes = sizes.filter(this.isSet);
		const $states = states.filter(this.isSet);
		const $styles = styles.filter(this.isSet);
		const $shapes = shapes.filter(this.isSet);
		const $modifiers = modifiers.filter(this.isSet);

		if (!$variants.length) $variants.push("default");
		if (!$sizes.length) $sizes.push("medium");
		if (!$shapes.length) $shapes.push("round");

		return $($variants, $sizes, $states, $styles, $modifiers, $shapes);
	}

	content() {
		const { children, label, className, style } = this.props;

		const attrs = {
			tabIndex: "-1",
			className: (className || "") + this.classes(),
			style: style,
		};

		// if children is a link <a>, clone and extend
		if (isLink(children)) {
			return cloneElement(children, attrs);
		}

		return createElement("b", attrs, label || children);
	}

	render(props, state) {
		const attrs = {
			id: props.id,
			tabIndex: "0",
			className: $.reset,
		};

		// add events if not disabled
		if (props.disabled) {
			attrs.disabled = "disabled";
		} else {
			attrs.onClick = props.onClick;
			attrs.onBlur = props.onBlur;
			attrs.onFocus = props.onFocus;
		}

		return createElement("button", attrs, this.content());
	}
}
