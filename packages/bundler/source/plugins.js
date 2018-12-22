import variables from "@nore/plugin-variables";
import js from "@nore/plugin-js";
import css from "@nore/plugin-css";
import html from "@nore/plugin-html";
import md from "@nore/plugin-md";
import toml from "@nore/plugin-toml";
import yaml from "@nore/plugin-yaml";
import images from "@nore/plugin-images";
import fonts from "@nore/plugin-fonts";

// order is important, don't change
export default [js, css, md, toml, yaml, html, images, fonts, variables];
