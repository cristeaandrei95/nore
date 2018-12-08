import loadable from "@loadable/component";
import React, { Component } from "react";
import { Scope, Link } from "@nore/pwa";
import $ from "./style.css";

const StyleGuide = loadable(() => import("./StyleGuide"));

export default (
	<b class={$.page}>
		<Scope exact match="/">
			<b class={$.links}>
				<Link to="/design" label="Design System" />
			</b>
		</Scope>

		<Scope match="/design" render={StyleGuide} />
	</b>
);
