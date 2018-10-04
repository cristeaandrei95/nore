import React, { Component } from "react";
import { Scope, Link } from "@nore/pwa";
import HTMLElements from "./HTMLElements";
import TypographyArticle from "./Typography/Article";
import $ from "./style.css";

const links = (
	<b class={$.links}>
		<Link to="html" label="HTML Elements" />
		<Link to="typography/article" label="Typography – Article" />
	</b>
);

export default scope => (
	<>
		<Scope exact render={links} />

		<Scope exact match="html" render={HTMLElements} />
		<Scope exact match="typography/article" render={TypographyArticle} />
	</>
);
