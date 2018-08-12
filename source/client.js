import React, { Component } from "react";
import ReactDOM from "react-dom";
import window from "@nore/std/global";
import { Application, qs } from "@nore/pwa";
import Pages from "~/pages";
import $ from "~/style";

const container = document.getElementById("application");

const state = {
	title: window.document.head.title || "navaru.com",
	path: window.location.pathname,
	query: qs.parse(window.location.search),
	hash: window.location.hash,
};

const application = (
	<Application state={state} container={container} class={$.application}>
		<Pages />
	</Application>
);

ReactDOM.render(application, container);

// enable HMR (Hot Module Replacement)
if (module.hot) {
	module.hot.accept();
}
