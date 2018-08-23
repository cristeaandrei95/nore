import React, { Component } from "react";
import $ from "./style.css";
import romanian from "./romanian.js";
import english from "./english.js";

const languages = {
	romanian,
	english,
};

export default class Article extends Component {
	state = { language: "english" };

	changeLanguage = () => {
		const { language } = this.state;

		this.setState({
			language: language == "english" ? "romanian" : "english",
		});
	};

	render(props, { language }) {
		const content = languages[language];

		const select = (
			<b class={$.select} onClick={this.changeLanguage}>
				Change to
				<b class={$.select_language}>
					{language == "english" ? "romanian" : "english"}
				</b>
			</b>
		);

		return (
			<b class={$.paper}>
				{select}
				{content}
			</b>
		);
	}
}
