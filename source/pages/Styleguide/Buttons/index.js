import React, { Component } from "react";
import { Link } from "nore";
import Button from "~/components/Button";
import Section from "../components/Section";
import Responsive from "../components/Responsive";
import $ from "./style.css";

export default () => (
	<Responsive title="Buttons">
		<b class={$.group}>
			<Button label="large" large accent />
			<Button label="default" />
			<Button label="focus" focus />
			<Button label="active" active />

			<Button label="small" small />
			<Button label="round" small round />
			<Button label="disabled" small disabled />
		</b>
		<b class={$.group}>
			<Button label="large" plain large />
			<Button label="plain" plain />
			<Button label="focus" plain focus />
			<Button label="active" plain active />

			<Button label="small" plain small />
			<Button label="round" plain small round />
			<Button label="disabled" plain small disabled />
		</b>
		<b class={$.group}>
			<Button small>
				<a href="#hashtag">#link</a>
			</Button>
			<Button small focus>
				<a href="#hashtag">#focus</a>
			</Button>
			<Button small active>
				<a href="#hashtag">#active</a>
			</Button>
			<Button small round>
				<Link to="/styleguide#buttons">link: internal</Link>
			</Button>
			<Button small round>
				<a href="http://google.com">link: external</a>
			</Button>
		</b>
	</Responsive>
);
