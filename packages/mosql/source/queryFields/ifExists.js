export default (value, query, build) => {
	return value ? "IF EXISTS" : "";
};
