import React, { Component } from "react";
import { isAbsolute } from "@nore/std/path";
import { isFunction } from "@nore/std/assert";
import join from "./util/join";

const { Provider, Consumer } = React.createContext("scope");

function inherit(context, path) {
	const ctx = Object.create(context);

	if (context) {
		ctx.path = isAbsolute(path) ? path : join(context.path, path);
	} else {
		ctx.path = path[0] === "/" ? path : "/" + path;
	}

	// keep track of matched nested segments
	// to allow "not found" functionality
	ctx.matched = [];

	return ctx;
}

function itMatches(parent, context, isExact) {
	const itMatches = isExact
		? parent.route === context.path
		: parent.route.indexOf(context.path) === 0;

	if (itMatches) {
		parent.matched.push(context.path);
	}

	return itMatches;
}

function renderOrChildren(render, children, context) {
	return render
		? React.createElement(render, { context })
		: isFunction(children)
			? children(context)
			: children;
}

class Scope extends Component {
	content(context) {
		const { render, children } = this.props;
		const content = renderOrChildren(render, children, context);

		return <Provider value={context}>{content}</Provider>;
	}

	render({ match, exact }, state) {
		return (
			<Consumer>
				{parent => {
					// create new scope and inherit from parent
					const context = inherit(parent, match);

					return itMatches(parent, context, exact)
						? this.content(context)
						: null;
				}}
			</Consumer>
		);
	}
}

Scope.Root = ({ context, route, path = "/", children }) => {
	const ctx = inherit(context, path);

	// route to match active contexts
	ctx.route = route;

	return <Provider value={ctx}>{children}</Provider>;
};

Scope.NotMatched = ({ children, render }) => (
	<Scope.Consumer>
		{context => {
			if (context.matched.length) {
				return null;
			}

			if (context.path === context.route) {
				return null;
			}

			return renderOrChildren(render, children, context);
		}}
	</Scope.Consumer>
);

Scope.Provider = Provider;
Scope.Consumer = Consumer;

export default Scope;
