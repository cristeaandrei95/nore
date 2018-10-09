export default function onNextEventLoop(callback) {
	return new Promise((resolve, reject) => {
		setImmediate(() => {
			callback(resolve, reject);
		});
	});
}
