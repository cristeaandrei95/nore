const REGEX_SPACES = /\s\s+/g;

export default class QueryTypesMap extends Map {
	add(type, template) {
		const tmpl = template
			.trim()
			.replace(REGEX_SPACES, " ")
			.split(" ")
			.map(v => (v[0] === "{" ? v.slice(1, -1) : v));

		this.set(type, tmpl);
	}
}
