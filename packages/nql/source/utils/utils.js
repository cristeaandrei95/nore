export function toParams(values) {
	return values.map(v => "?").join(", ");
}

export function quote(value) {
	return `"${value}"`;
}

export function isNullOrBoolean(value) {
	return value === true || value === false || value === null;
}

export function toUpperCase(value) {
	return String(value).toUpperCase();
}
