import bundles from "@nore/nore-bundles";
import variables from "@nore/nore-variables";
import javascript from "@nore/nore-js";
import css from "@nore/nore-css";
import html from "@nore/nore-html";
import images from "@nore/nore-images";
import fonts from "@nore/nore-fonts";
import md from "@nore/nore-md";
import toml from "@nore/nore-toml";
import yaml from "@nore/nore-yaml";

export default [
	bundles(),
	variables(),
	javascript(),
	css(),
	html(),
	images(),
	fonts(),
	md(),
	toml(),
	yaml(),
	//..
];
