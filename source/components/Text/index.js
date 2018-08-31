import React, { Component } from "react";
import $ from "./style.css";

const sizes = [
	"xsmall",
	"small",
	"smallish",
	"medium",
	"semi",
	"large",
	"xlarge",
];

export default class Text extends Component {
	render(props, state) {
		const { className, children, sans, serif } = props;
		const type = $[serif ? "serif" : "sans"];
		const size = $(sizes.filter(key => props[key]));
		const classes = `${size} ${type} ${className || ""}`;

		return <b class={classes}>{children}</b>;
	}
}
