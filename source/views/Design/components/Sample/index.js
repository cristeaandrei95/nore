import React, { Component } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { unescape } from "@nore/std/html";
import { isArray } from "@nore/std/assert";
import $ from "./style.css";

const Context = React.createContext({});

export const Details = ({ children }) => (
	<Context.Consumer>
		{state => <b class={$.details}>{children}</b>}
	</Context.Consumer>
);

export const Example = ({ children }) => (
	<Context.Consumer>
		{({ isShowCode, toggleCode }) => (
			<b class={$.example}>
				<b class={$.example_toggle} onClick={toggleCode}>
					{isShowCode ? "Show example" : "Show code"}
				</b>
				{isShowCode ? (
					<b class={$.example_code}>
						{unescape(renderToStaticMarkup(children))}
					</b>
				) : (
					children
				)}
			</b>
		)}
	</Context.Consumer>
);

export class Sample extends Component {
	state = { isShowCode: false };

	toggleCode = () => {
		this.setState({ isShowCode: !this.state.isShowCode });
	};

	render({ children }, { isShowCode }) {
		const { toggleCode } = this;
		const api = { isShowCode, toggleCode };

		return (
			<b class={$.sample}>
				<Context.Provider value={api}>{children}</Context.Provider>
			</b>
		);
	}
}
