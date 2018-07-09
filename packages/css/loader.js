module.exports = function loader(content, map, meta) {
	console.log(content, map, meta);
	console.log(this.resourcePath);
	console.log(this.resourceQuery);

	return "console.log('style')";
};
