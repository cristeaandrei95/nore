import React, { Component } from "react";
import window from "@nore/std/global";
import { isFunction } from "@nore/std/assert";
import { isAbsolute } from "@nore/std/path";
import join from "./util/join";
import Scope from "./Scope";
import navigate from "./navigate";

function getOrigin({ protocol, hostname, port }) {
	return protocol + "//" + hostname + (port ? ":" + port : "");
}

function isExternal(link) {
	// Location.origin and HTMLAnchorElement.origin
	// are not supported by IE and Safari.
	return getOrigin(window.location) !== getOrigin(link);
}

function prevent(event) {
	if (event.stopImmediatePropagation) {
		event.stopImmediatePropagation();
	}

	if (event.stopPropagation) {
		event.stopPropagation();
	}

	event.preventDefault();

	return false;
}

/*
	- to: "/path/to?some=query"
	- label: ""
*/
export default class Link extends Component {
	onClick(event, context) {
		const { target, onClick, to } = this.props;

		if (isFunction(onClick)) {
			onClick(event);
		}

		// let the browser handle the click
		if (this.props.hasOwnProperty("native")) return;

		// open in new window
		if (target === "_blank" || this.props.hasOwnProperty("newtab")) return;

		// URL is not internal
		if (isExternal(event.currentTarget)) return;

		// ignore hashtags
		if (to.charAt(0) === "#") return;

		// not clicked with main mouse button
		if (event.button !== 0) return;

		// meta keys are pressed
		if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey)
			return;

		// join relative paths to context path
		navigate(isAbsolute(to) ? to : join(context.path, to));

		return prevent(event);
	}

	// TODO: add prefetch like in next.js?
	render({ className, to, target, children, label, style }) {
		return (
			<Scope.Consumer>
				{context => (
					<a
						style={style}
						href={to}
						target={target}
						class={className || ""}
						onClick={event => {
							this.onClick(event, context);
						}}
						children={children || label}
					/>
				)}
			</Scope.Consumer>
		);
	}
}
