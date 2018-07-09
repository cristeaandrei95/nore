import React, { Component } from "react";
import { isFunction } from "@nore/std/assert";
import Scope from "./Scope";

export default ({ children, render, title }) => (
	<Scope.Consumer>
		{scope => {
			if (scope.matched.length) {
				return null;
			}

			if (scope.data.path === scope.route) {
				return null;
			}

			if (title) {
				scope.set("title", title);
			}

			return isFunction(children) ? children(scope) : children;
		}}
	</Scope.Consumer>
);
