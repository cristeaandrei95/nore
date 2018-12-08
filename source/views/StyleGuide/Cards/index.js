import React, { Component } from "react";
import Section from "../components/Section";
import $ from "./style.css";

export default () => (
	<b class={$.cards}>
		<b class={$.card_v1} />
		<b class={$.card_v1}>
			<b class={$.card_header}>header</b>
		</b>
		<b class={$.card_v2} />
		<b class={$.card_v3} />
		<b class={$.card_v4} />
		<b class={$.card_v5} />
		<b class={$.card_v6} />
		<b class={$.card_v7} />
		<b class={$.card_v8} />
		<b class={$.card_v9} />
		<b class={$.card_v10} />
	</b>
);
