import React, { Component } from "react";
import { Sample, Details, Example } from "../components/Sample";
import $ from "./style.css";

export default () => (
	<b class={$.html}>
		<Sample>
			<Details>
				<code>&lt;h1&gt;</code> - <code>&lt;h6&gt;</code> – six levels of
				section headings
			</Details>
			<Example>
				<h1>The mind is a wonderful servant but a terrible master.</h1>
				<h2>The mind is a wonderful servant but a terrible master.</h2>
				<h3>The mind is a wonderful servant but a terrible master.</h3>
				<h4>The mind is a wonderful servant but a terrible master.</h4>
				<h5>The mind is a wonderful servant but a terrible master.</h5>
				<h6>The mind is a wonderful servant but a terrible master.</h6>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;abbr&gt;</code> – abbreviation or acronym
			</Details>
			<Example>
				The{" "}
				<abbr title="Web Hypertext Application Technology Working Group">
					WHATWG
				</abbr>{" "}
				started working on HTML5 in 2004.
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;code&gt;</code> – a fragment of computer code
			</Details>
			<Example>
				The <code>push()</code> method adds one or more elements to the end of
				an array.
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;del&gt;</code> – represents a range of text that has been
				deleted from a document.
			</Details>
			<Example>
				My favourite colour is <del dateTime="2010-10-11T01:25-07:00">blue</del>
				<ins dateTime="2010-10-11T01:25-07:01">red</ins>, but I also like green
				and yellow.
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;ins&gt;</code> – represents a range of text that has been
				added to a document.
			</Details>
			<Example>
				My favourite colour is <del dateTime="2010-10-11T01:25-07:00">blue</del>
				<ins dateTime="2010-10-11T01:25-07:01">red</ins>, but I also like green
				and yellow.
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;kbd&gt;</code> – user keyboard input
			</Details>
			<Example>
				Keystrokes: <kbd>Cmd ⌘</kbd>+<kbd>Shift ⇧</kbd>+<kbd>Alt ⌥</kbd>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;mark&gt;</code> – represents marked or highlighted text
			</Details>
			<Example>
				In this sentence we'll be using the mark element. <mark>HTML5</mark> Can
				you see where it has been used?
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;q&gt;</code> – phrasing content quoted from another source
			</Details>
			<Example>
				And then he said <q>I heart HTML5</q>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;s&gt;</code> – text that is no longer correct, accurate or
				relevant
			</Details>
			<Example>
				<s>Get up to 25% off!</s> Great Offer 50% off!
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;samp&gt;</code> – output from a program or computing system
			</Details>
			<Example>
				<samp>
					Keyboard not found <br /> Press F1 to continue
				</samp>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;small&gt;</code> – small print
			</Details>
			<Example>
				<small> Copyright © {new Date().getFullYear()} Company Inc. </small>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;strong&gt;</code> – strong importance
			</Details>
			<Example>
				Design is <strong>useful</strong> and <strong>significant</strong>.
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;sub&gt;</code> – subscripts
			</Details>
			<Example>
				H<sub>2</sub>O is the chemical formula for water.
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;sup&gt;</code> – superscripts
			</Details>
			<Example>
				Today is the 2<sub>nd</sub> of May.
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;u&gt;</code> – unarticulated text
			</Details>
			<Example>
				We left the <u>kichen</u> door open. (misspelled words)
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;var&gt;</code> – represents a variable
			</Details>
			<Example>
				The volume of a box is <var>l</var> × <var>w</var> × <var>h</var>, where{" "}
				<var>l</var> represents the length, <var>w</var> the width and{" "}
				<var>h</var> the height of the box.
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;ol&gt;</code> – an ordered list
			</Details>
			<Example>
				<ol>
					<li>Get a grip on your emotions</li>
					<li>Understand what cash flow is</li>
					<li>Recognize the sales mentality</li>
					<li>Learn to anticipate and recognize the changes </li>
				</ol>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;ul&gt;</code> – an unordered list
			</Details>
			<Example>
				<ul>
					<li>Free 14-day trial</li>
					<li>Full access to all features</li>
					<li>Simple email signup</li>
					<li>No credit card required</li>
					<li>Framer runs on macOS</li>
				</ul>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;pre&gt;</code> – block of preformatted text
			</Details>
			<Example>
				<pre>{`
<script>
	var elements = document.getElementsByTagName("body");
	var body = elements[0];

	body.style.backgroundColor = "indianred";
</script>
			`}</pre>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;address&gt;</code> – contact information for its enclosing
				section
			</Details>
			<Example>
				<address>
					<strong>Company, Inc.</strong>
					<br />1<sup>st</sup> Awesome Street, Nr. 101
					<br />
					New York, NY 10101
					<br />
					<abbr title="Mobile Phone">Mobile:</abbr> (123) 456-7890
				</address>
				<address>
					<strong>Full Name</strong>
					<br />
					<a href="mailto:#">first.last@server.com</a>
				</address>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;blockquote&gt;</code> – a section that is quoted from another
				source
			</Details>
			<Example>
				<blockquote>
					<p>
						Wise men speak because they have something to say; Fools because
						they have to say something.
					</p>
				</blockquote>
				<cite>Plato – The Republic</cite>
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;cite&gt;</code> – The title of a work
			</Details>
			<Example>
				The case <cite>Hugo v. Danielle</cite> is relevant here.
			</Example>
		</Sample>
		<Sample>
			<Details>
				<code>&lt;hr&gt;</code> – represents a horizontal line
			</Details>
			<Example>
				Let us sacrifice our today so that our children can have a better
				tomorrow.
				<hr />
				There is nothing permanent except change.
			</Example>
		</Sample>
	</b>
);
