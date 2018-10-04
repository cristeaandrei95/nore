import loadable from "loadable-components";
import React, { Component } from "react";
import { Scope, Link } from "@nore/pwa";
import $ from "./style.css";

export default (
	<b class={$.page}>
		<Scope exact match="/">
			<b class={$.links}>
				<Link to="/playground" label="Playground" />
				<Link to="/design" label="Design System" />
			</b>
		</Scope>

		<Scope
			match="/playground"
			render={loadable(() => import("./playground"))}
		/>
	</b>
);
// <Scope match="/design" render={loadable(() => import("./design"))} />
