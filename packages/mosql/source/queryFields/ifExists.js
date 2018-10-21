export default (value, query, build) => {
	return value ? "if exists" : "";
};
