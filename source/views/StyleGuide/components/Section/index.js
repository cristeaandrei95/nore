import React, { Component } from "react";
import { Link } from "@nore/pwa";
import $ from "./style.css";

const Title = ({ children }) => (
	<b class={$.title}>
		<Link to={"/styleguide/" + children.toLowerCase()} label={children} />
	</b>
);

export default ({ children, title, className = "", style, flexible }) => (
	<b class={$.section} style={style}>
		{title ? <Title>{title}</Title> : null}

		<b class={className + $[flexible ? "flexible" : "centered"]}>{children}</b>
	</b>
);
