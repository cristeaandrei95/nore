export default request => {
	try {
		return require.resolve(request);
	} catch (error) {
		return false;
	}
};
