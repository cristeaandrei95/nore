import loadable from "@loadable/component";
import React, { Component } from "react";
import { Scope, Link } from "@nore/pwa";
import $ from "./style.css";

const Playground = loadable(() => import("./playground"));
const Design = loadable(() => import("./design"));

export default (
	<b class={$.page}>
		<Scope exact match="/">
			<b class={$.links}>
				<Link to="/playground" label="Playground" />
				<Link to="/design" label="Design System" />
			</b>
		</Scope>

		<Scope match="/playground" render={Playground} />
		<Scope match="/design" render={Design} />
	</b>
);
