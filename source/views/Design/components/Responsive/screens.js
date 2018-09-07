import $variables from "@nore/variables.json";

const screens = Object.keys($variables)
	.filter(key => key.indexOf("screen_") === 0)
	.map(key => key.replace("screen_", ""));

export default screens;
