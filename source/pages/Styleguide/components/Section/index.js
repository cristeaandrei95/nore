import React, { Component } from "react";
import $ from "./style.css";

export default ({ children, title, className = "", style, flexible }) => (
	<b class={$.section} style={style}>
		{title ? <b class={$.title}>{title}</b> : null}

		<b class={className + $[flexible ? "flexible" : "centered"]}>{children}</b>
	</b>
);
