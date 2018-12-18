function logDemoPlugin(nore) {
	// nore.log.debug("demo");
	return "demo";
}

export default {
	mode: "testing",
	plugins: [logDemoPlugin],
};
