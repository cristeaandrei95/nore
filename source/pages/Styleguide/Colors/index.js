import React, { Component } from "react";
import Section from "../components/Section";
import $ from "./style.css";

export default () => (
	<Section title="Colors" style={{ background: "#FFFFFF" }}>
		<b class={$.colors}>
			<b class={$.color} style={{ backgroundColor: "#FFFEFC" }}>
				#FFFEFC
			</b>
			<b class={$.color} style={{ backgroundColor: "#EEF2F5" }}>
				#EEF2F5
			</b>
			<b class={$.color} style={{ backgroundColor: "#4957B8" }}>
				#4957B8
			</b>
			<b class={$.color} style={{ backgroundColor: "#F5F6F8" }}>
				#F5F6F8
			</b>
			<b class={$.color} style={{ backgroundColor: "#F6F9FC" }}>
				#F6F9FC
			</b>
			<b class={$.color} style={{ backgroundColor: "#FBFBFB" }}>
				#FBFBFB
			</b>
			<b class={$.color} style={{ backgroundColor: "#F5F9FC" }}>
				#F5F9FC
			</b>
			<b class={$.color} style={{ backgroundColor: "#E6F3F3" }}>
				#E6F3F3
			</b>
			<b class={$.color} style={{ backgroundColor: "#F4F7FB" }}>
				#F4F7FB
			</b>
		</b>
	</Section>
);
