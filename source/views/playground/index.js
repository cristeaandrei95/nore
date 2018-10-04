import React, { Component } from "react";
import { Scope, Link } from "@nore/pwa";
import Flexbox from "./Flexbox";

export default () => (
	<b style={{ padding: "4rem" }}>
		<Scope exact>
			<Link to="/playground/flexbox" label="Flexbox" />
		</Scope>

		<Scope exact match="/playground/flexbox" render={Flexbox} />
	</b>
);
