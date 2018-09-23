import React, { Component } from "react";
import $ from "../style.css";
import $typo from "~/style/typography";

export default (
	<b class={$typo.font_serif} style={{ margin: "0 auto", maxWidth: "60rem" }}>
		<b class={$typo.headline}>
			Mental Models: How to Train Your Brain to Think in New Ways
		</b>
		<b class={$typo.subhead}>
			Mental Models: How to Train Your Brain to Think in New Ways This article
			shares some useful examples of <a href="#">pequliar modles groups</a> work
			(and how the right mental model can make a big difference).
		</b>

		<p>
			You can <strong>train your brain</strong> to think better. One of the best
			ways to do this is to expand the{" "}
			<a href="#">set of puping quoted gallon</a> you use to think. Let me
			explain what I mean by sharing a story about a{" "}
			<strong>world-class thinker</strong>.
		</p>

		<p>
			I first discovered what a mental model was and how useful the right one
			could be while I was reading a story about <em>Richard Feynman</em>, the
			famous physicist. Feynman received his undergraduate degree from{" "}
			<a href="#">MIT Media Lab</a> and his Ph.D. from Princeton. During that
			time, he developed a reputation for waltzing into the math department and
			solving problems that the brilliant Ph.D. students couldn’t solve.
		</p>

		<p>
			When people asked how he did it, Feynman claimed that his{" "}
			<strong>secret weapon</strong>
			was not his intelligence, but rather a strategy he learned in high school.
			According to Feynman, his high school physics teacher asked him to stay
			<em>after class</em> one day and gave him a challenge.
		</p>

		<figure>
			<img src="https://images.unsplash.com/photo-1524821695732-717b25a38974?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=08f92fcbaca12ac3d128dbc91f447164&auto=format&fit=crop&w=2500&q=80" />
			<figcaption>Woman with a tattoo holding up a stack of books</figcaption>
		</figure>

		<b class={$typo.header}>Custom web fonts</b>

		<p>
			Around 2010, browsers began supporting <mark>custom web fonts</mark>,
			which was great, except for the fact that each browser and device required
			a different file format. Accordingly, most websites provided 4 different
			web font files:
		</p>

		<table>
			<thead>
				<tr>
					<th>File Format</th>
					<th>Browser/Device</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>.svg</td>
					<td>Very old Safari (iOS and Desktop)</td>
				</tr>
				<tr>
					<td>.eot</td>
					<td>Internet Explorer</td>
				</tr>
				<tr>
					<td>.ttf</td>
					<td>Everything except Internet Explorer</td>
				</tr>
				<tr>
					<td>.woff</td>
					<td>Newer browsers</td>
				</tr>
			</tbody>
		</table>

		<b class={$typo.header}>embedding a web font</b>

		<p>
			Sweet. We’ve got a WOFF file. To actually use it in our web page, we need
			to embed it into our stylesheet with the <code>@font-face</code>
			“at-rule”. Web fonts must always be included at the top of a stylesheet,
			so add the following to the very beginning of <code>typo.css</code>:
		</p>

		<pre>{`
	@font-face {
	  font-family: 'Roboto';
	  src: url('Roboto-Light-webfont.woff') format('woff');
	}
	`}</pre>

		<p>
			The <code>font-family</code> property defines how we’ll refer to this font
			later on. This operates as an internal label, so it can be anything you
			want. It doesn’t need to relate to the official name of the font, but it’s
			usually more intuitive if it does. As we’ll see in a moment, it’s a good
			idea to keep the name as generic as possible (e.g., <code>Roboto</code>
			instead of <code>Roboto Light</code>
			).
		</p>

		<p>
			Next, we have the src property, which defines the path to the
			<code>.woff</code> file via the <code>url()</code> notation. The path can
			be absolute, relative, or root-relative. If you use a relative path like
			we did here, it will always be relative to the <code>.css</code> file—not
			the HTML document. The <code>format()</code> notation lets browsers know
			which web font file format it is.
		</p>

		<p>
			If you reload web-fonts.html page, you won’t see any change because
			<code>@font-face</code> only gave us access to our .woff file. We still
			need to use it somewhere else in our stylesheet.
		</p>

		<img src="https://jamesclear.com/wp-content/uploads/2017/07/richard-feynman.jpg" />

		<b class={$typo.header}>What is a Mental Model?</b>

		<p>
			A mental model is an explanation of how something works. It is a concept,
			framework, or worldview that you carry around in your mind to help you
			interpret the world and understand the relationship between things. Mental
			models are deeply held beliefs about how the world works.
		</p>

		<p>
			For example, supply and demand is a mental model that helps you understand
			how the economy works. Game theory is a mental model that helps you
			understand how relationships and trust work.{" "}
			<a href="https://jamesclear.com/entropy">Entropy</a> is a mental model
			that helps you understand how disorder and decay work.
		</p>

		<p>
			Mental models guide your perception and behavior. They are the thinking
			tools that you use to understand life, make decisions, and solve problems.
			Learning a new mental model gives you a new way to see the world—like
			Richard Feynman learning a new math technique.
		</p>

		<p>
			Mental models are imperfect, but useful. There is no single mental model
			from physics or engineering, for example, that provides a flawless
			explanation of the entire universe, but the best mental models from those
			disciplines have allowed us to build bridges and roads, develop new
			technologies, and even travel to outer space. As historian Yuval Noah
			Harari puts it, “Scientists generally agree that no theory is 100 percent
			correct. Thus, the real test of knowledge is not truth, but utility.”
		</p>

		<p>
			The best mental models are the ideas with the most utility. They are
			broadly useful in daily life. Understanding these concepts will help you
			make wiser choices and take better actions. This is why developing a broad
			base of mental models is critical for anyone interested in thinking
			clearly, rationally, and effectively.
		</p>

		<b class={$typo.header}>The Secret to Great Thinking and Decision Making</b>

		<p>
			Expanding your set of mental models is something experts need to work on
			just as much as novices. We all have our favorite mental models, the ones
			we naturally default to as an explanation for how or why something
			happened. As you grow older and develop expertise in a certain area, you
			tend to favor the mental models that are most familiar to you.
		</p>

		<p>
			Here's the problem: when a certain worldview dominates your thinking,
			you’ll try to explain every problem you face through that worldview. This
			pitfall is particularly easy to slip into when you're smart or talented in
			a given area.
		</p>

		<p>
			The more you master a single mental model, the more likely it becomes that
			this mental model will be your downfall because you’ll start applying it
			indiscriminately to every problem. What looks like expertise is often a
			limitation. As the common proverb says, “If all you have is a hammer,
			everything looks like a nail.”
		</p>

		<blockquote>
			When a certain worldview dominates your thinking, you’ll try to explain
			every problem you face through that worldview.
		</blockquote>

		<p>
			Consider this example from biologist Robert Sapolsky. He asks, “Why did
			the chicken cross the road?” Then, he provides answers from different
			experts.
		</p>

		<ul>
			<li>
				If you ask an evolutionary biologist, they might say, “The chicken
				crossed the road because they saw a potential mate on the other side.”
			</li>
			<li>
				If you ask a kinesiologist, they might say, “The chicken crossed the
				road because the muscles in the leg contracted and pulled the leg bone
				forward during each step.”
			</li>
			<li>
				If you ask a neuroscientist, they might say, “The chicken crossed the
				road because the neurons in the chicken’s brain fired and triggered the
				movement.”
			</li>
		</ul>

		<p>
			Technically speaking, none of these experts are wrong. But nobody is
			seeing the entire picture either. Each individual mental model is just one
			view of reality. The challenges and situations we face in life cannot be
			entirely explained by one field or industry.
		</p>

		<p>
			All perspectives hold some truth. None of them contain the complete truth.
		</p>

		<p>
			Relying on a narrow set of thinking tools is like wearing a mental
			straitjacket. Your cognitive range of motion is limited. When your set of
			mental models is limited, so is your potential for finding a solution. In
			order to unleash your full potential, you have to collect a range of
			mental models. You have to build out your decision making toolbox. Thus,
			the secret to great thinking is to learn and employ a variety of mental
			models.
		</p>

		<b class={$typo.header}>Expanding Your Set of Mental Models</b>

		<p>
			The process of accumulating mental models is somewhat like improving your
			vision. Each eye can see something on its own. But if you cover one of
			them, you lose part of the scene. It’s impossible to see the full picture
			when you’re only looking through one eye.
		</p>

		<p>
			Similarly, mental models provide an internal picture of how the world
			works. We should continuously upgrade and improve the quality of this
			picture. This means reading widely from the best books, studying the
			fundamentals of seemingly unrelated fields, and learning from people with
			wildly different life experiences.
		</p>

		<p>
			The mind's eye needs a variety of mental models to piece together a
			complete picture of how the world works. The more sources you have to draw
			upon, the clearer your thinking becomes. As the philosopher Alain de
			Botton notes, “The chief enemy of good decisions is a lack of sufficient
			perspectives on a problem.”
		</p>

		<b class={$typo.header}>The Pursuit of Liquid Knowledge</b>

		<p>
			In school, we tend to separate knowledge into different silos—biology,
			economics, history, physics, philosophy. In the real world, information is
			rarely divided into neatly defined categories. In the words of Charlie
			Munger, “All the wisdom of the world is not to be found in one little
			academic department.”
		</p>

		<p>
			World-class thinkers are often silo-free thinkers. They avoid looking at
			life through the lens of one subject. Instead, they develop “liquid
			knowledge” that flows easily from one topic to the next.
		</p>

		<p>
			This is why it is important to not only learn new mental models, but to
			consider how they connect with one another. Creativity and innovation
			often arise at the intersection of ideas. By spotting the links between
			various mental models, you can identify solutions that most people
			overlook.
		</p>

		<b class={$typo.header}>Tools for Thinking Better</b>

		<p>Here's the good news:</p>

		<p>
			You don't need to master every detail of every subject to become a
			world-class thinker. Of all the mental models humankind has generated
			throughout history, there are just a few dozen that you need to learn to
			have a firm grasp of how the world works.
		</p>

		<p>
			Many of the most important mental models are the big ideas from
			disciplines like biology, chemistry, physics, economics, mathematics,
			psychology, philosophy. Each field has a few mental models that form the
			backbone of the topic. For example, some of the pillar mental models from
			economics include ideas like Incentives, Scarcity, and Economies of Scale.
		</p>

		<p>
			If you can master the fundamentals of each discipline, then you can
			develop a remarkably accurate and useful picture of life. To quote Charlie
			Munger again, “80 or 90 important models will carry about 90 percent of
			the freight in making you a worldly-wise person. And, of those, only a
			mere handful really carry very heavy freight.”
		</p>

		<p>
			I've made it a personal mission to uncover the big models that carry the
			heavy freight in life. After researching more than 1,000 different mental
			models, I gradually narrowed it down to a few dozen that matter most. I've
			written about some of them previously, like entropy and inversion, and
			I'll be covering more of them in the future. If you're interested, you can
			browse my slowly expanding list of mental models.
		</p>

		<p>
			My hope is to create a list of the most important mental models from a
			wide range of disciplines and explain them in a way that is not only easy
			to understand, but also meaningful and practical to the daily life of the
			average person. With any luck, we can all learn how to think just a little
			bit better.
		</p>
	</b>
);
