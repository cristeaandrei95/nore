import React, { Component } from "react";
import Device from "../Device";
import Section from "../Section";
import $ from "./style.css";

const layouts = {
	mobile: "320",
	tablet: "780",
	monitor: "100%",
};

const Action = ({ onClick, isActive, icon }) => (
	<b onClick={onClick} class={$("action", { is_active: isActive })}>
		<i class={icon} />
	</b>
);

const Actions = ({ onSelect, selected }) => (
	<b class={$.actions}>
		{Object.keys(layouts).map(layout => (
			<Action
				key={layout}
				icon={`ns-${layout}`}
				isActive={layout === selected}
				onClick={() => onSelect(layout)}
			/>
		))}
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
		const width = this.props.width || layouts[selected];
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

				<b class={$.layout_select}>
					<Actions selected={selected} onSelect={this.setLayout} />
				</b>
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
