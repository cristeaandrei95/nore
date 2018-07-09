import baz, { foo, bar } from "./source.js";

if (typeof foo !== "function") {
	console.error("typeof foo invalid");
}

if (typeof bar !== "number") {
	console.error("typeof bar invalid");
}

if (typeof baz !== "function") {
	console.error("typeof baz invalid");
}

if (typeof require !== "function") {
	console.error("require not a function in source");
}

baz();
