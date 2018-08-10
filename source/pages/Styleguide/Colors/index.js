import React, { Component } from "react";
import toClipboard from "~/util/toClipboard.js";
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

const Color = ({ name, value }) => {
	const style = { background: value };
	const copyName = e => toClipboard(name);
	const copyValue = e => {
		toClipboard(value);
		e.stopPropagation();
	};

	return (
		<b class={$.color} style={style} onClick={copyName}>
			<b class={$.color_name}>
				{name.split(".").pop()}

				<b class={$.color_value} onClick={copyValue}>
					{value}
				</b>
			</b>
		</b>
	);
};

export default () => (
	<Section>
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
	</Section>
);
