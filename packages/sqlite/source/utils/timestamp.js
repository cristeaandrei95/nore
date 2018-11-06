// ensure that we have 2 places for each of the date segments.
function format(segment) {
	segment = segment.toString();
	return segment[1] ? segment : "0" + segment;
}

// format: yyyymmddhhmmssmmm
export default function timestamp() {
	const now = new Date();

	const year = now.getFullYear().toString();
	const month = format(now.getMonth() + 1);
	const date = format(now.getDate());
	const hours = format(now.getHours());
	const minutes = format(now.getMinutes());
	const seconds = format(now.getSeconds());
	const milliseconds = now.getMilliseconds().toString();

	return year + month + date + hours + minutes + seconds + milliseconds;
}
