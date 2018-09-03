// ensure that we have 2 places for each of the date segments.
function format(segment) {
	segment = segment.toString();
	return segment[1] ? segment : `0${segment}`;
}

// format: yyyymmddhhmmss
export default function timestamp() {
	const date = new Date();

	const year = date.getFullYear().toString();
	const month = format(date.getMonth() + 1);
	const date = format(date.getDate());
	const hours = format(date.getHours());
	const minutes = format(date.getMinutes());
	const seconds = format(date.getSeconds());

	return year + month + date + hours + minutes + seconds;
}
