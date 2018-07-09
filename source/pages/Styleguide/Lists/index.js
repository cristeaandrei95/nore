import React, { Component } from "react";
import Section from "../components/Section";
import $ from "./style.css";

export default () => (
	<Section title="Lists">
		<b class={$.check_list}>
			<b class={$.check_list_item}>Free 14-day trial</b>
			<b class={$.check_list_item}>Full access to all features</b>
			<b class={$.check_list_item}>Simple email signup</b>
			<b class={$.check_list_item}>No credit card required</b>
			<b class={$.check_list_item}>Framer runs on macOS</b>
		</b>
	</Section>
);
