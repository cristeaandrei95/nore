import React, { Component } from "react";
import Section from "../components/Section";
import $ from "./style.css";

export default () => (
	<Section title="Devices">
		<b class={$.device}>
			<b class={$.device_screen} />
		</b>
	</Section>
);
