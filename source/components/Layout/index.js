import { Link } from "nore";
import React, { Component } from "react";
import $ from "./style.css";

export default () => (
	<b class={$.menu}>
		<Link url="/" class={$.menu_item}>
			home
		</Link>
		<Link url="/about" class={$.menu_item}>
			about
		</Link>
		<Link url="/contact" label="Contact" class={$.menu_item} />
		<Link url="/admin" label="Admin" class={$.menu_item} />
		<Link url="/admin/settings" label="Admin settings" class={$.menu_item} />
		<Link url="/notfound" label="Not found" class={$.menu_item} />
		<Link url="https://google.com" label="google.com" class={$.menu_item} />
	</b>
);
