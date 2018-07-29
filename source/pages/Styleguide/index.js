import React, { Component } from "react";
import Buttons from "./Buttons";
import Typography from "./Typography";
import Colors from "./Colors";
import Lists from "./Lists";
import Cards from "./Cards";
import Elements from "./Elements";
import $ from "./style.css";

export default scope => (
	<b class={$.styleguide}>
		<Buttons />
		<Typography />
		<Colors />
		<Lists />
		<Cards />
		<Elements />
	</b>
);
