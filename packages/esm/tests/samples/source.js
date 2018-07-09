export const foo = function boo() {};
export const bar = 12345;

export default () => {
	if (typeof require !== "function") {
		console.error("require not a function in source");
	}

	console.log("valid");
};
