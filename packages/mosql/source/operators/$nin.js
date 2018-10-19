import $in from "./$in.js";

function invert(value) {
	return value.replace(" IN ", " NOT IN ").replace(/ IS /g, " IS NOT ");
}

export default args => {
	const result = $in(args);

	if (result && result.sql) {
		result.sql = invert(result.sql);

		return result;
	}

	return invert(result);
};
