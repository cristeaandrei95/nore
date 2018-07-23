import React, { Component } from "react";
import { Scope, Link } from "nore";
import Styleguide from "./Styleguide";

export default context => (
	<b>
		<Scope exact match="/">
			<b style={{ padding: "4rem" }}>
				<Link to="/styleguide" label="Styleguide" />
			</b>
		</Scope>

		<Scope match="/styleguide" render={Styleguide} />
	</b>
);
