import React, { Component, createElement, cloneElement } from "react";
import $ from "./style.css";

const isLink = el =>
	el && el.type && (el.type === "a" || el.type.name === "Link");

const variants = ["default", "plain", "outlined", "flat", "raised"];
const sizes = ["small", "medium", "large", "xlarge"];
const states = ["hover", "active", "focus"];
const shapes = ["sharp", "round", "pill"];
const modifiers = ["disabled"];
const styles = ["primary", "secondary", "accent", "positive", "negative"];

export default class Button extends Component {
	getStyle = (list, fallback) => {
		const style = $(list.filter(i => this.props[i]));

		return !style && fallback ? $[fallback] : style;
	};

	classes() {
		const variant = this.getStyle(variants, "default");
		const size = this.getStyle(sizes, "medium");
		const shape = this.getStyle(shapes, "round");
		const modifier = this.getStyle(modifiers);
		const style = this.getStyle(styles);
		const state = this.getStyle(states);

		return `${variant} ${size} ${shape} ${modifier} ${style} ${state}`;
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
