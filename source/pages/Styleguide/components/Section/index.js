import React, { Component } from "react";
import $ from "./style.css";

export default ({ children, title, className = "", style }) => (
	<b class={$.section} style={style}>
		<b class={`${$.content} ${className}`}>
			{title ? <h3>{title}</h3> : null}
			{children}
		</b>
	</b>
);
