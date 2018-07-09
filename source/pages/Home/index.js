import React, { Component } from "react";
import { Link } from "~/application";
import $ from "./style.css";
import OMFG from "./omfg";

export default () => (
	<b class={$.home}>
		<Link to="/styleguide" label="Style guide like a boss!" class={$.link} />
		<OMFG />
	</b>
);
