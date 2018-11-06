export default class QueryFieldsMap extends Map {
	add(field, handler) {
		this.set(field, handler);
	}
}
