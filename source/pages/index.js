import React, { Component } from "react";
import loadable from "loadable-components";
import { View } from "~/application";
import backgroundImage from "~/images/screenshot.png";

const Home = loadable(() => import("./Home"));
const Styleguide = loadable(() => import("./Styleguide"));

export default scope => (
	<b style={{ backgroundImage }}>
		<View exact path="/" Component={Home} />
		<View path="/styleguide" Component={Styleguide} />
	</b>
);
