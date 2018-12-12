import variables from "@nore/plugin-variables";
import javascript from "@nore/plugin-js";
import css from "@nore/plugin-css";
import html from "@nore/plugin-html";
import md from "@nore/plugin-md";
import toml from "@nore/plugin-toml";
import yaml from "@nore/plugin-yaml";
import images from "@nore/plugin-images";
import fonts from "@nore/plugin-fonts";

const plugins = {
	variables,
	javascript,
	css,
	html,
	md,
	toml,
	yaml,
	images,
	fonts,
};

export default async (options = {}) => {
	const config = {
		plugins: [],
	};
};
