import React, { Component } from "react";
import Section from "../components/Section";
import $ from "./style.css";

export default () => (
	<Section>
		<b class={$.button}>button</b>
		<b class={$.button_primary}>primary</b>
		<b class={$.button_secondary}>secondary</b>
	</Section>
);
