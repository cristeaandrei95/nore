export default callback =>
	new Promise((resolve, reject) => {
		setImmediate(() => {
			callback(resolve, reject);
		});
	});
