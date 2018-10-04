import { loadComponents } from "loadable-components";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Application from "./Application";

export default function render(args) {
	const application = (
		<Application
			state={args.state}
			container={args.container}
			class={args.class}
			style={args.style}
			children={args.children}
		/>
	);

	if (IN_NODE) {
		return application;
	}

	if (IN_BROWSER) {
		function reactDOMRender() {
			return ReactDOM.render(application, args.container);
		}

		return args.isAsync
			? loadComponents().then(reactDOMRender)
			: reactDOMRender();
	}
}
