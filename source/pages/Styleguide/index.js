import React, { Component } from "react";
import Responsive from "./components/Responsive";
import Section from "./components/Section";
import Baseline from "./components/Baseline";
import Buttons from "./Buttons";
import Typography from "./Typography";
import Colors from "./Colors";
import Lists from "./Lists";
import Cards from "./Cards";
import HTML from "./HTML";
import $ from "./style.css";

export default scope => (
	<b class={$.styleguide}>
		<Baseline />
		<Responsive title="Buttons">
			<Buttons />
		</Responsive>
		<Responsive title="Typography" height="560">
			<Typography />
		</Responsive>
		<Section title="Colors">
			<Colors />
		</Section>
		<Section title="Cards">
			<Cards />
		</Section>
		<Section title="HTML">
			<HTML />
		</Section>
	</b>
);
