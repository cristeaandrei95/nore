import React, { Component } from "react";
import { Scope, Link } from "@nore/pwa";
import Article from "./design/Typography/Article";

const index = (
	<Scope exact match="/">
		<b style={{ padding: "4rem" }}>
			<Link to="/design/typography/article" label="Typography / Article" />
		</b>
	</Scope>
);

export default (
	<b>
		{index}
		<Scope exact match="/design/typography/article" render={Article} />
	</b>
);
