import React, { Component } from "react";
import { Scope, Link } from "@nore/pwa";
import Styleguide from "./Styleguide";
import Typography from "./Styleguide/Typography";
import Buttons from "./Styleguide/Buttons";
import Colors from "./Styleguide/Colors";
import HTML from "./Styleguide/HTML";
import Ideas from "./Styleguide/Ideas";
import Article from "./Styleguide/Typography/Article";
import Cropping from "./Styleguide/Typography/Cropping";

const $link = { display: "block" };

export default context => (
	<b>
		<Scope exact match="/">
			<b style={{ padding: "4rem" }}>
				<Link to="/styleguide" label="Styleguide" style={$link} />
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

		<Scope exact match="/styleguide" render={Styleguide} />
		<Scope exact match="/styleguide/buttons" render={Buttons} />
		<Scope exact match="/styleguide/typography" render={Typography} />
		<Scope exact match="/styleguide/colors" render={Colors} />
		<Scope exact match="/styleguide/html" render={HTML} />

		<Scope exact match="/styleguide/ideas" render={Ideas} />
		<Scope exact match="/styleguide/typography/article" render={Article} />
		<Scope exact match="/styleguide/typography/cropping" render={Cropping} />
	</b>
);
