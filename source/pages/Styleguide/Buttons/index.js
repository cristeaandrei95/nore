import React, { Component } from "react";
import { Link } from "nore";
import Button from "~/components/Button";
import Section from "../components/Section";
import $ from "./style.css";

export default () => (
	<Section>
		<b class={$.group}>
			<Button label="default" />
			<Button label="focus" focus />
			<Button label="active" active />
		</b>
		<b class={$.group}>
			<Button small round>
				<a href="#hashtag">#hashtag</a>
			</Button>

			<Button small round>
				<Link to="/styleguide#buttons">link: internal</Link>
			</Button>

			<Button small round>
				<a href="http://google.com">link: external</a>
			</Button>
		</b>
		<b class={$.group}>
			<Button ghost>default</Button>
			<Button ghost round>
				round
			</Button>
			<Button ghost round small>
				round
			</Button>
		</b>
		<b class={$.group}>
			<Button label="flat" flat />
			<Button label="ghost small" small />
		</b>
	</Section>
);
