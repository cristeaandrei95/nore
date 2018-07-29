import React, { Component, Children } from "react";
import ReactDOM from "react-dom";

const template = ({ className }) => `
	<!DOCTYPE html>
	<html>
		<head></head>
		<body>
			<div id="root" class="${className}"></div>
		</body>
	</html>
`;

const style = {
	display: "block",
	border: "none",
	margin: "0",
	width: "100%",
	height: "100%",
	padding: "0",
};

class Content extends Component {
	componentDidMount() {
		this.props.onMount();
	}

	componentDidUpdate() {
		this.props.onUpdate();
	}

	render() {
		return Children.only(this.props.children);
	}
}

export default class Frame extends Component {
	isMounted = false;
	isReady = false;
	iframe = null;

	get document() {
		return this.iframe && this.iframe.contentDocument;
	}

	get container() {
		return this.document.body.children[0];
	}

	onRefNode = node => {
		// ignore on unmount
		if (!node) return;

		this.iframe = node;

		if (this.iframe.contentDocument.readyState === "complete") {
			// call it on next event cycle
			setTimeout(this.onIframeReady, 0);
		} else {
			this.iframe.addEventListener("load", this.onIframeReady);
		}
	};

	onIframeReady = () => {
		const { document } = this;

		const html = template({
			className: this.props.className,
		});

		document.open("text/html", "replace");
		document.write(html);
		document.close();

		if (this.props.onReady) {
			this.props.onReady({ document, iframe: this.iframe });
		}

		this.isReady = true;
		this.forceUpdate();
	};

	onContentUpdate = () => {
		if (this.props.onUpdate) {
			this.props.onUpdate({ document: this.document, iframe: this.iframe });
		}
	};

	onContentMount = () => {
		if (this.props.onMount) {
			this.props.onMount({ document: this.document, iframe: this.iframe });
		}
	};

	content() {
		if (!this.isReady) return null;

		const content = (
			<Content onMount={this.onContentMount} onUpdate={this.onContentUpdate}>
				{this.props.children}
			</Content>
		);

		return ReactDOM.createPortal(content, this.container);
	}

	componentDidMount() {
		this.isMounted = true;
		this.forceUpdate();
	}

	componentWillUnmount() {
		this.iframe.removeEventListener("load", this.onIframeReady);
	}

	render(props, state) {
		// ignore initial render
		if (!this.isMounted) return null;

		return (
			<iframe style={style} ref={this.onRefNode}>
				{this.content()}
			</iframe>
		);
	}
}
