import React, { Component } from "react";
import $ from "./style.css";
import romanian from "./samples/romanian.js";
import english from "./samples/english.js";
import legalDocument from "./samples/legal_document";

export default () => (
	<b class={$.paper}>
		{legalDocument}
		<hr />
		{english}
		<hr />
		{romanian}
	</b>
);
