export default (value, query, build) => {
	return value ? "DISTINCT" : "";
};
