import React, { Component } from "react";
import Section from "../components/Section";
import Responsive from "../components/Responsive";
import Article from "./Article";
import $ from "./style.css";

export default () => (
	<Section title="Typography" flexible style={{ padding: "2rem" }}>
		<Responsive>
			<Article />
		</Responsive>
	</Section>
);
