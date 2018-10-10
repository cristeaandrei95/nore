import React, { Component } from "react";
import Application from "./Application";

export default function render(options) {
	/* state, container, class, children */
	const component = (
		<Application
			state={options.state}
			container={options.container}
			class={options.class}
			style={options.style}
			children={options.children}
		/>
	);

	if (IN_NODE) {
		const { renderToString } = require("react-dom/server");
		const html = renderToString(component);

		return { html, component };
	}

	if (IN_BROWSER) {
		const { render } = require("react-dom");

		return render(component, args.container);
	}
}
