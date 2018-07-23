import React, { Component } from "react";
import Sample from "../components/Sample";
import Section from "../components/Section";
import $ from "./style.css";

export default () => (
	<Section title="HTML elements">
		<Sample>
			<Sample details>
				<code>&lt;abbr&gt;</code> – abbreviation or acronym
			</Sample>
			<Sample example>
				The{" "}
				<abbr title="Web Hypertext Application Technology Working Group">
					WHATWG
				</abbr>{" "}
				started working on HTML5 in 2004.
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;code&gt;</code> – a fragment of computer code
			</Sample>
			<Sample example>
				The <code>push()</code> method adds one or more elements to the end of
				an array.
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;del&gt;</code> – a removal from the document
			</Sample>
			<Sample example>
				My favourite colour is <del dateTime="2010-10-11T01:25-07:00">blue</del>
				<ins dateTime="2010-10-11T01:25-07:01">red</ins>, but I also like green
				and yellow.
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;ins&gt;</code> – addition to the document
			</Sample>
			<Sample example>
				My favourite colour is <del dateTime="2010-10-11T01:25-07:00">blue</del>
				<ins dateTime="2010-10-11T01:25-07:01">red</ins>, but I also like green
				and yellow.
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;kbd&gt;</code> – user keyboard input
			</Sample>
			<Sample example>
				Mac users: To take a screenshot press <kbd>Command</kbd>+<kbd>
					Shift
				</kbd>+<kbd>3</kbd>
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;mark&gt;</code> – marked or highlighted
			</Sample>
			<Sample example>
				In this sentence we'll be using the mark element. <mark>HTML5</mark> Can
				you see where it has been used?
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;q&gt;</code> – phrasing content quoted from another source
			</Sample>
			<Sample example>
				And then he said <q>I heart HTML5</q>
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;s&gt;</code> – No longer accurate or no longer relevant
			</Sample>
			<Sample example>
				<s>Get up to 25% off!</s> Great Offer 50% off!
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;samp&gt;</code> – output from a program or computing system
			</Sample>
			<Sample example>
				<samp>
					Keyboard not found <br /> Press F1 to continue
				</samp>
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;small&gt;</code> – small print
			</Sample>
			<Sample example>
				<small> Copyright © {new Date().getFullYear()} Company Inc. </small>
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;strong&gt;</code> – strong importance
			</Sample>
			<Sample example>
				Design is <strong>useful</strong> and <strong>significant</strong>.
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;sub&gt;</code> – subscripts
			</Sample>
			<Sample example>
				H<sub>2</sub>O is the chemical formula for water.
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;sup&gt;</code> – superscripts
			</Sample>
			<Sample example>
				Today is the 2<sub>nd</sub> of May.
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;u&gt;</code> – unarticulated text
			</Sample>
			<Sample example>
				We left the <u>kichen</u> door open. (misspelled words)
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;var&gt;</code> – represents a variable
			</Sample>
			<Sample example>
				The volume of a box is <var>l</var> × <var>w</var> × <var>h</var>, where{" "}
				<var>l</var> represents the length, <var>w</var> the width and{" "}
				<var>h</var> the height of the box.
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;ol&gt;</code> – an ordered list
			</Sample>
			<Sample example>
				<ol>
					<li>Get a grip on your emotions</li>
					<li>Understand what cash flow is</li>
					<li>Recognize the sales mentality</li>
					<li>Learn to anticipate and recognize the changes </li>
				</ol>
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;ul&gt;</code> – an unordered list
			</Sample>
			<Sample example>
				<ul>
					<li>Free 14-day trial</li>
					<li>Full access to all features</li>
					<li>Simple email signup</li>
					<li>No credit card required</li>
					<li>Framer runs on macOS</li>
				</ul>
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;pre&gt;</code> – block of preformatted text
			</Sample>
			<Sample example>
				<pre>{`
<script>
	var elements = document.getElementsByTagName("body");
	var body = elements[0];

	body.style.backgroundColor = "indianred";
</script>
			`}</pre>
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;address&gt;</code> – contact information for its enclosing
				section
			</Sample>
			<Sample example>
				<address>
					<strong>Company, Inc.</strong>
					<br />
					1<sup>st</sup> Awesome Street, Nr. 101<br />
					New York, NY 10101<br />
					<abbr title="Mobile Phone">Mobile:</abbr> (123) 456-7890
				</address>
				<address>
					<strong>Full Name</strong>
					<br />
					<a href="mailto:#">first.last@server.com</a>
				</address>
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;blockquote&gt;</code> – a section that is quoted from another
				source
			</Sample>
			<Sample example>
				<blockquote>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
						posuere erat a ante.
					</p>
					<small>
						John Doe - <cite title="Source Title">Source Title</cite>
					</small>
				</blockquote>
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;cite&gt;</code> – The title of a work
			</Sample>
			<Sample example>
				My favourite book is <cite>Introducing HTML5</cite> by Bruce and Remy
			</Sample>
		</Sample>
		<Sample>
			<Sample details>
				<code>&lt;hr&gt;</code> – represents a horizontal line
			</Sample>
		</Sample>
	</Section>
);
