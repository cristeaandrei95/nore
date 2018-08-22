import React, { Component } from "react";
import copyToClipboard from "~/util/toClipboard.js";
import Section from "../components/Section";
import $variables from "@nore/variables.json";
import $ from "./style.css";

const palettes = Object.keys($variables)
	.filter(key => /color\.\w+\./.test(key))
	.reduce((acc, value) => {
		const [_, color] = value.match(/(?:color\.)(\w+)\./);
		return acc.includes(color) ? acc : acc.concat([color]);
	}, []);

const getByType = type =>
	Object.keys($variables)
		.filter(key => key.includes(`color.${type}.`))
		.map(key => ["$" + key, $variables[key]]);

const toClipboard = value => event => {
	copyToClipboard(value);
	event.stopPropagation();
};

const Color = ({ name, value }) => (
	<b class={$.color} style={{ background: value }} onClick={toClipboard(name)}>
		<b class={$.color_name}>
			{name.split(".").pop()}

			<b class={$.color_value} onClick={toClipboard(value)}>
				{value}
			</b>
		</b>
	</b>
);

export default () => (
	<b class={$.colors}>
		{palettes.map(palette => (
			<b class={$.section} key={palette}>
				<code>$color.{palette}</code>

				<b class={$[palette] || $.palette}>
					{getByType(palette).map(([name, value]) => (
						<Color key={name} name={name} value={value} />
					))}
				</b>
			</b>
		))}
	</b>
);
