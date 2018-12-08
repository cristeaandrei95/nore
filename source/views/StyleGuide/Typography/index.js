import React, { Component } from "react";
import Section from "../components/Section";
import Responsive from "../components/Responsive";
import Article from "./Article";
import Cropping from "./Cropping";
import $ from "./style.css";

// export default () => <Article />;

export default () => (
	<b class={$.section}>
		<Cropping />
	</b>
);
