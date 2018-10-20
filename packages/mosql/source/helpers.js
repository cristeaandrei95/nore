const REGEX_SPACES = /\s\s+/g;
const REGEX_VARIABLES = /\{\w+\}/g;

export function parseQueryType(template) {
	const variables = template.match(REGEX_VARIABLES);

	return {
		variables,
		fields: variables.map(s => s.slice(1, -1)),
		template: template.trim().replace(REGEX_SPACES, " "),
	};
}

export function isNullOrBoolean(value) {
	return value === true || value === false || value === null;
}

export function toUpperCase(value) {
	return String(value).toUpperCase();
}

export function normalizeQuery(query) {
	if (query.type == "select") {
		if (!query.columns) {
			query.columns = "*";
		}
	}

	return query;
}
