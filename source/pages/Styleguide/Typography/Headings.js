import React, { Component } from "react";
import $ from "./style.css";

const Entry = ({ label, children }) => (
	<b class={$.heading}>
		<b class={$.heading_label}>{label}</b>
		<b class={$.heading_text}>{children}</b>
	</b>
);

export default () => (
	<b class={$.headings}>
		<hr />
		<h1>Simplicity is the ultimate sophistication.</h1>
		<p>
			Simple can be harder than complex. You have to work hard to get your
			thinking clean to make it simple. But it’s worth it in the end because
			once you get there, you can move mountains.
		</p>
		<hr />
		<h2>Simplicity is the ultimate sophistication.</h2>
		<p>
			Simple can be harder than complex. You have to work hard to get your
			thinking clean to make it simple. But it’s worth it in the end because
			once you get there, you can move mountains.
		</p>
		<hr />
		<h3>Simplicity is the ultimate sophistication.</h3>
		<p>
			Simple can be harder than complex. You have to work hard to get your
			thinking clean to make it simple. But it’s worth it in the end because
			once you get there, you can move mountains.
		</p>
		<hr />
		<h4>Simplicity is the ultimate sophistication.</h4>
		<p>
			Simple can be harder than complex. You have to work hard to get your
			thinking clean to make it simple. But it’s worth it in the end because
			once you get there, you can move mountains.
		</p>
		<hr />
		<h5>Simplicity is the ultimate sophistication.</h5>
		<p>
			Simple can be harder than complex. You have to work hard to get your
			thinking clean to make it simple. But it’s worth it in the end because
			once you get there, you can move mountains.
		</p>
		<hr />
	</b>
);
