import React, { Component } from "react";
import Device from "../Device";
import $application from "nore/style/index.css";
import $ from "./style.css";

const layouts = {
	mobile: { width: "320", height: "560" },
	tablet: { width: "780", height: "560" },
	monitor: { width: "100%", height: "560" },
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
	state = { selected: "tablet" };

	render({ className, style, children }, { selected }) {
		const { width, height } = layouts[selected];

		return (
			<b class={className} style={style}>
				<Device
					width={width}
					height={height}
					class={$.device}
					frameClass={$application.application}
				>
					{children}
				</Device>

				<b class={$.layout_select}>
					<Actions
						selected={selected}
						onSelect={selected => this.setState({ selected })}
					/>
				</b>
			</b>
		);
	}
}
