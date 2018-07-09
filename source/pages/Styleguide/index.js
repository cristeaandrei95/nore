import React, { Component } from "react";
import Colors from "./Colors";
import Buttons from "./Buttons";
import Lists from "./Lists";
import Cards from "./Cards";
import Devices from "./Devices";
import Elements from "./Elements";
import $ from "./style.css";

export default scope => (
	<b class={$.styleguide}>
		<Colors />
		<Buttons />
		<Lists />
		<Cards />
		<Devices />
		<Elements />
	</b>
);
