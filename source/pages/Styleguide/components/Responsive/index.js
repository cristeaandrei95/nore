import React, { Component } from "react";
import Device from "../Device";
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

	layout() {
		const { selected } = this.state;
		const { children } = this.props;
		const width = this.props.width || layouts[selected];
		const height = this.props.height || "560";

		if (!selected) {
			return (
				<b class={$.container} style={{ maxHeight: `${height}px` }}>
					<b class={$.content}>{children}</b>
				</b>
			);
		}

		return (
			<Device width={width} height={height} class={$.device}>
				<b class={$.content}>{children}</b>
			</Device>
		);
	}

	render({ className, style, children }, { selected }) {
		return (
			<b class={className} style={style}>
				{this.layout()}

				<b class={$.layout_select}>
					<Actions selected={selected} onSelect={this.setLayout} />
				</b>
			</b>
		);
	}
}
