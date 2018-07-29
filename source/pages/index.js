import React, { Component } from "react";
import { Scope, Link } from "nore";
import Styleguide from "./Styleguide";
import Article from "./Styleguide/Typography/Article";

export default context => (
	<b>
		<Scope exact match="/">
			<b style={{ padding: "4rem" }}>
				<Link to="/styleguide" label="Styleguide" /> <br />
				<Link to="/typography/article" label="Typography / Article" />
			</b>
		</Scope>

		<Scope match="/styleguide" render={Styleguide} />
		<Scope match="/typography/article" render={Article} />
	</b>
);
