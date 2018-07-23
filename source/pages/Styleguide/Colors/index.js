import React, { Component } from "react";
import toClipboard from "~/util/toClipboard.js";
import Section from "../components/Section";
import $variables from "$variables";
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
	const onClick = e => toClipboard(name);
	const style = { background: value };

	return (
		<b class={$.color} style={style} onClick={onClick}>
			<b class={$.color_value}>{value}</b>
			<b class={$.color_name}>{name}</b>
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
						<Color key={name} name={name.split(".").pop()} value={value} />
					))}
				</b>
			</b>
		))}
	</Section>
);
