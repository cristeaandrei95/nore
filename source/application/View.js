import React, { Component } from "react";
import { isFunction } from "@nore/std/assert";
import join from "~/util/join";
import Scope from "./Scope";

function itMatches(parent, scope, exact) {
	if (exact) {
		var itMatches = parent.data.path === scope.route;
	} else {
		var itMatches = parent.data.path.indexOf(scope.route) === 0;
	}

	if (itMatches) {
		parent.matched.push(scope.route);
	}

	return itMatches;
}

export default ({ path = "/", title, children, exact, Component }) => (
	<Scope.Consumer>
		{parent => {
			// create new scope and inherit from parent
			const scope = Object.create(parent);

			scope.route = join(parent.route, path);
			scope.matched = [];

			if (itMatches(parent, scope, exact)) {
				const props = { scope, title };

				if (title) {
					scope.set("title", title);
				}

				return (
					<Scope.Provider value={scope}>
						{Component ? (
							<Component title={title} scope={scope} />
						) : isFunction(children) ? (
							children(scope)
						) : (
							children
						)}
					</Scope.Provider>
				);
			}

			return null;
		}}
	</Scope.Consumer>
);
