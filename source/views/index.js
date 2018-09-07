import React, { Component } from "react";
import { Scope, Link } from "@nore/pwa";
import Design from "./Design";
import Typography from "./Design/Typography";
import Buttons from "./Design/Buttons";
import Colors from "./Design/Colors";
import HTML from "./Design/HTML";
import Ideas from "./Design/Ideas";
import Article from "./Design/Typography/Article";
import Cropping from "./Design/Typography/Cropping";

const $link = { display: "block" };

export default (
	<b>
		<Scope exact match="/">
			<b style={{ padding: "4rem" }}>
				<Link to="/styleguide" label="Design" style={$link} />
				<Link
					to="/styleguide/typography/article"
					label="Typography / Article"
					style={$link}
				/>
				<Link
					to="/styleguide/typography/cropping"
					label="Typography / Cropping"
					style={$link}
				/>
			</b>
		</Scope>

		<Scope exact match="/styleguide" render={Design} />
		<Scope exact match="/styleguide/buttons" render={Buttons} />
		<Scope exact match="/styleguide/typography" render={Typography} />
		<Scope exact match="/styleguide/colors" render={Colors} />
		<Scope exact match="/styleguide/html" render={HTML} />

		<Scope exact match="/styleguide/ideas" render={Ideas} />
		<Scope exact match="/styleguide/typography/article" render={Article} />
		<Scope exact match="/styleguide/typography/cropping" render={Cropping} />
	</b>
);
