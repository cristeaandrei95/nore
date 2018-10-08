import variables from "@nore/nore-variables";
import javascript from "@nore/nore-js";
import css from "@nore/nore-css";
import html from "@nore/nore-html";
import md from "@nore/nore-md";
import toml from "@nore/nore-toml";
import yaml from "@nore/nore-yaml";
import images from "@nore/nore-images";
import fonts from "@nore/nore-fonts";

export default [
	variables(),
	javascript(),
	css(),
	html(),
	md(),
	toml(),
	yaml(),
	images(),
	fonts(),
];
