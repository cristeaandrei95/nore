import React, { Component } from "react";
import { Link } from "@nore/pwa";
import Button from "~/components/Button";
import Section from "../components/Section";
import Responsive from "../components/Responsive";
import $ from "./style.css";

const Group = ({ title, children }) => (
	<b class={$.group}>
		<b class={$.group_title}>{title}</b>
		<b class={$.group_content}>{children}</b>
	</b>
);

export default () => (
	<Responsive title="Buttons">
		<Group title="default / hover / active / focus">
			<Button label="default" />
			<Button label="hover" hover />
			<Button label="active" active />
			<Button label="focus" focus />
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
			<Button label="flat" flat />
			<Button label="pill" pill />
			<Button label="disabled" disabled />
		</Group>
		<Group title="primary / secondary / tertiary / positive / negative">
			<Button label="primary" primary />
		</Group>
		<Group title="<Link> / <a>">
			<Button round>
				<Link to="/styleguide#buttons">link: internal</Link>
			</Button>
			<Button round>
				<a href="http://google.com">link: external</a>
			</Button>
			<Button round>
				<a href="#hashtag">#link</a>
			</Button>
			<Button round active>
				<a href="#hashtag">#active</a>
			</Button>
			<Button round focus>
				<a href="#hashtag">#focus</a>
			</Button>
		</Group>
		<Group title="onClick / onFocus / onBlur">
			<Button label="on click" round onClick={e => console.log(e)} />
			<Button label="on focus" round onFocus={e => console.log(e)} />
			<Button label="on blur" round onBlur={e => console.log(e)} />
		</Group>
	</Responsive>
);

// <b class={$.group}>
// 	<Button label="large" large accent />
// 	<Button label="default" />
// 	<Button label="focus" focus />
// 	<Button label="active" active />

// 	<Button label="small" small />
// 	<Button label="round" small round />
// 	<Button label="disabled" small disabled />
// </b>
// <b class={$.group}>
// 	<Button label="large" plain large />
// 	<Button label="plain" plain />
// 	<Button label="focus" plain focus />
// 	<Button label="active" plain active />

// 	<Button label="small" plain small />
// 	<Button label="round" plain small round />
// 	<Button label="disabled" plain small disabled />
// </b>
// <b class={$.group}>
// 	<Button small>
// 		<a href="#hashtag">#link</a>
// 	</Button>
// 	<Button small focus>
// 		<a href="#hashtag">#focus</a>
// 	</Button>
// 	<Button small active>
// 		<a href="#hashtag">#active</a>
// 	</Button>
// 	<Button small round>
// 		<Link to="/styleguide#buttons">link: internal</Link>
// 	</Button>
// 	<Button small round>
// 		<a href="http://google.com">link: external</a>
// 	</Button>
// </b>
