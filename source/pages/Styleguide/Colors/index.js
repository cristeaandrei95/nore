import React, { Component } from "react";
import Section from "../components/Section";
import $ from "./style.css";

export default () => (
	<Section title="Colors" style={{ background: "#FFF" }}>
		<b class={$.colors}>
			<b class={$.color} style={{ backgroundColor: "#FFFEFC" }}>
				#fffefc
			</b>
			<b class={$.color} style={{ backgroundColor: "#EEF2F5" }}>
				#eef2f5
			</b>
			<b class={$.color} style={{ backgroundColor: "#4957B8" }}>
				#4957B8
			</b>
			<b class={$.color} style={{ backgroundColor: "#F5F6F8" }}>
				#f5f6f8
			</b>
			<b class={$.color} style={{ backgroundColor: "#F6F9FC" }}>
				#f6f9fc
			</b>
			<b class={$.color} style={{ backgroundColor: "#FBFBFB" }}>
				#FBFBFB
			</b>
			<b class={$.color} style={{ backgroundColor: "#F5F9FC" }}>
				#f5f9fc
			</b>
			<b class={$.color} style={{ backgroundColor: "#E6F3F3" }}>
				#e6f3f3
			</b>
			<b class={$.color} style={{ backgroundColor: "#F4F7FB" }}>
				#f4f7fb
			</b>
		</b>
	</Section>
);
