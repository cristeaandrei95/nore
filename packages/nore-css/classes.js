// utility for conditionally joining CSS classes together
export default function(classes) {
	const result = [];

	for (let i = 1; i < arguments.length; ++i) {
		const filter = arguments[i];

		// ignore null / false / undefined
		if (!filter) continue;

		if (typeof filter === "string") {
			result.push(classes[filter]);
		} else if (Array.isArray(filter) && filter.length) {
			for (let i = 0; i < filter.length; ++i) {
				const key = filter[i];

				if (classes[key]) {
					result.push(classes[key]);
				}
			}
		} else {
			for (const key in filter) {
				if (filter[key] && classes[key]) {
					result.push(classes[key]);
				}
			}
		}
	}

	// leave a space so it won't mess with other
	// classes defined during concatenation
	return " " + result.join(" ");
}
