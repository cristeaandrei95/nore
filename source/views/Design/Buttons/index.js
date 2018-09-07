import React, { Component } from "react";
import { Link } from "@nore/pwa";
import Button from "~/components/Button";
import Section from "../components/Section";
import $ from "./style.css";

const Group = ({ title, children }) => (
	<b class={$.group}>
		<b class={$.group_title}>{title}</b>
		<b class={$.group_content}>{children}</b>
	</b>
);

export default () => (
	<b>
		<Group title="default / hover / active / focus">
			<Button label="default" />
			<Button label="hover" hover />
			<Button label="active" active />
			<Button label="focus" focus />
		</Group>
		<Group title="raised / hover / active / focus">
			<Button label="raised" raised />
			<Button label="hover" hover raised />
			<Button label="active" active raised />
			<Button label="focus" focus raised />
		</Group>
		<Group title="flat / hover / active / focus">
			<Button label="flat" flat />
			<Button label="hover" flat hover />
			<Button label="active" flat active />
			<Button label="focus" flat focus />
		</Group>
		<Group title="small / medium / large / xlarge">
			<Button label="small" small />
			<Button label="medium" />
			<Button label="large" large />
			<Button label="xlarge" xlarge />
		</Group>
		<Group title="sharp / round / pill / disabled">
			<Button label="sharp" sharp />
			<Button label="round" round />
			<Button label="pill" pill />
			<Button label="disabled" disabled />
		</Group>
		<Group title="primary / secondary / accent / positive / negative">
			<Button label="primary" primary />
			<Button label="secondary" secondary />
			<Button label="accent" accent />
			<Button label="positive" positive />
			<Button label="negative" negative />
		</Group>
		<Group title="onClick / onFocus / onBlur">
			<Button label="on click" round onClick={e => console.log(e)} />
			<Button label="on focus" round onFocus={e => console.log(e)} />
			<Button label="on blur" round onBlur={e => console.log(e)} />
		</Group>
		<Group title="<Link> / <a>">
			<Button round>
				<Link to="/styleguide#buttons">link: internal</Link>
			</Button>
			<Button round>
				<a href="http://google.com">link: external</a>
			</Button>
		</Group>
	</b>
);
