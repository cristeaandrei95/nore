export default function log(...data) {
	const now = new Date();
	const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

	console.log(time, `[▸]`, ...data);
}
