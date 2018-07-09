import React, { Component } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { unescape } from "@nore/std/html";
import { isArray } from "@nore/std/assert";
import $ from "./style.css";

export default class Sample extends Component {
	state = { isShowCode: false };

	renderDetails() {
		const { children } = this.props;

		if (isArray(children)) {
			const details = children.filter(c => c.props.details).pop();

			return <b class={$.details}>{details}</b>;
		}

		return null;
	}

	renderExample() {
		const { children } = this.props;
		const { isShowCode } = this.state;

		if (isArray(children)) {
			const example = children.filter(c => c.props.example).pop();
			const onClick = e => this.setState({ isShowCode: !isShowCode });

			const toogle = (
				<b class={$.example_toggle} onClick={onClick}>
					{isShowCode ? "Show example" : "Show code"}
				</b>
			);

			if (isShowCode) {
				const code = unescape(renderToStaticMarkup(example));

				return (
					<b class={$.example}>
						{toogle}
						<b class={$.example_code}>{code}</b>
					</b>
				);
			}

			return (
				<b class={$.example}>
					{toogle}
					{example}
				</b>
			);
		}

		return null;
	}

	render({ children, details, example }) {
		if (details || example) {
			return children;
		}

		return (
			<b class={$.sample}>
				{this.renderDetails()}
				{this.renderExample()}
			</b>
		);
	}
}
