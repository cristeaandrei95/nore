import Frame from "~/components/Frame";
import React, { Component } from "react";
import $application from "~/style";
import $ from "./style.css";

function copyCSSToFrame(parent, iframe) {
	const links = document.querySelectorAll(`link[type="text/css"]`);
	const styles = document.getElementsByTagName("style");

	for (const nodes of [links, styles]) {
		for (let i = 0; i < nodes.length; ++i) {
			const node = iframe.importNode(nodes[i], true);

			iframe.head.appendChild(node);
		}
	}
}

function onReady({ iframe, document }) {
	// copy CSS styles from parent document to iframe
	copyCSSToFrame(window.document, document);
}

function onUpdate({ iframe, document }) {
	// autoupdate iframe height to match content
	iframe.height = document.body.children[0].scrollHeight + "px";
}

export default ({ children, className, width, height }) => {
	const style = {
		width: width.includes("%") ? width : parseInt(width) + 16 + "px",
		height: height.includes("%") ? height : parseInt(height) + 40 + "px",
	};

	return (
		<b class={$.device + " " + className} style={style}>
			<b class={$.content}>
				<Frame
					onReady={onReady}
					onMount={onUpdate}
					onUpdate={onUpdate}
					class={$application}
				>
					{children}
				</Frame>
			</b>
		</b>
	);
};
