export default function metaToDefs(meta) {
	return {
		name: meta.name,
		type: meta.type.toLowerCase(),
		default: meta.dflt_value,
		isNullable: !Boolean(meta.notnull),
		isPrimaryKey: Boolean(meta.pk),
		// TODO: how to properly get the uniqueness of a column?
		isUnique: Boolean(meta.pk),
	};
}
