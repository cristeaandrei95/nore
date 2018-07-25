import React, { Component } from "react";
import $ from "./style.css";

export default ({ children, title, className = "", style }) => (
	<b class={$.section} style={style}>
		{title ? <b class={$.title}>{title}</b> : null}
		<b class={`${$.content} ${className}`}>{children}</b>
	</b>
);
