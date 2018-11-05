export function getPlaceholders(n, hasParens) {
	const placeholders = "?"
		.repeat(n)
		.split("")
		.join(", ");

	return hasParens ? `(${placeholders})` : placeholders;
}

export function quote(string) {
	return `"${string}"`;
}
