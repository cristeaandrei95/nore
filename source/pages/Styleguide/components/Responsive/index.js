import React, { Component } from "react";
import Device from "../Device";
import Section from "../Section";
import screens from "./screens.js";
import $ from "./style.css";

const Action = ({ onClick, isActive, icon, label }) => (
	<b onClick={onClick} class={$("action", { is_active: isActive })}>
		{icon ? <b class={icon} /> : label + "px"}
	</b>
);

const Actions = ({ onSelect, selected }) => (
	<b class={$.actions_block}>
		<b class={$.actions}>
			<Action
				icon="ns-mobile"
				isActive={"320" === selected}
				onClick={() => onSelect("320")}
			/>

			{screens.map(size => (
				<Action
					key={size}
					label={size}
					isActive={size === selected}
					onClick={() => onSelect(size)}
				/>
			))}

			<Action
				icon="ns-monitor"
				isActive={"100%" === selected}
				onClick={() => onSelect("100%")}
			/>
		</b>
	</b>
);

export default class Typography extends Component {
	constructor({ layout }) {
		super();
		this.state = { selected: layout || null };
	}

	setLayout = layout => {
		const { selected } = this.state;

		this.setState({
			selected: selected === layout ? null : layout,
		});
	};

	render({ className, style, children, title }, { selected }) {
		const width = this.props.width || selected;
		const height = this.props.height || "560";

		const content = selected ? (
			<Device width={width} height={height} class={$.device}>
				<b class={$.content}>{children}</b>
			</Device>
		) : (
			<b class={$.content_container} style={{ maxHeight: `${height}px` }}>
				<b class={$.content}>{children}</b>
			</b>
		);

		const container = (
			<b class={$.reponsive}>
				{content}

				<Actions selected={selected} onSelect={this.setLayout} />
			</b>
		);

		return (
			<Section
				title={title}
				class={className}
				style={style}
				flexible={selected}
				children={container}
			/>
		);
	}
}
