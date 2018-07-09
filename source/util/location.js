export function getOrigin() {
	const { protocol, hostname, port } = window.location;

	return `${protocol}//${hostname}${port ? ":" + port : ""}`;
}

export function getURL() {
	const { href } = window.location;
	const origin = getOrigin();

	return href.substring(origin.length);
}
