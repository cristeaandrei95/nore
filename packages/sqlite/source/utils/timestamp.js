// ensure that we have 2 places for each of the date segments.
function format(n, segment) {
	return segment.toString().padStart(n, "0");
}

// format: yyyymmddhhmmssmmm
export default function timestamp(now = new Date()) {
	const year = now.getFullYear().toString();
	const month = format(2, now.getMonth() + 1);
	const date = format(2, now.getDate());
	const hours = format(2, now.getHours());
	const minutes = format(2, now.getMinutes());
	const seconds = format(2, now.getSeconds());
	const milliseconds = format(3, now.getMilliseconds());

	return year + month + date + hours + minutes + seconds + milliseconds;
}
