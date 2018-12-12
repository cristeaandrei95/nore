// utility for conditionally joining CSS classes together
export default function(classes) {
	const result = [];

	for (let i = 1; i < arguments.length; ++i) {
		const arg = arguments[i];
		const type = typeof arg;

		// ignore null / false / undefined
		if (!arg) continue;

		// case arg is a string
		if (type === "string") {
			// ignore empty strings
			if (arg.length) {
				// pass the CSS modules class or a custom class
				result.push(classes[arg] || arg);
			}
		}
		// case arg is an array
		else if (Array.isArray(arg)) {
			for (let i = 0; i < arg.length; ++i) {
				const key = arg[i];
				const classname = classes[key];

				if (classname) {
					result.push(classname);
				}
			}
		}
		// case arg is an object
		else {
			for (const name in arg) {
				const isTrue = arg[name];
				const classname = classes[name];

				if (isTrue && classname) {
					result.push(classname);
				}
			}
		}
	}

	// leave a space so it won't mess with other
	// classes defined during concatenation
	return result.length ? " " + result.join(" ") : "";
}
