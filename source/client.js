import React, { Component } from "react";
import ReactDOM from "react-dom";
import qs from "query-string";
import window from "@nore/std/global";
import { Application } from "~/application";
import Pages from "~/pages";

const container = document.getElementById("application");

const state = {
	title: window.document.head.title || "navaru.com",
	path: window.location.pathname,
	query: qs.parse(window.location.search),
	hash: window.location.hash,
};

const application = (
	<Application state={state} container={container}>
		<Pages />
	</Application>
);

ReactDOM.render(application, container);
