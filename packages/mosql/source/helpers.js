const REGEX_SPACES = /\s\s+/g;

export class QueryTypesMap extends Map {
	add(type, template) {
		const tmpl = template
			.trim()
			.replace(REGEX_SPACES, " ")
			.split(" ")
			.map(v => (v[0] === "{" ? v.slice(1, -1) : v));

		this.set(type, tmpl);
	}
}

export class QueryFieldsMap extends Map {
	add(field, handler) {
		this.set(field, handler);
	}
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

export function normalizeQuery(query) {
	if (query.type == "select") {
		if (!query.columns) {
			query.columns = "*";
		}
	}

	return query;
}
