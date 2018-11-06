export function toDefinitions(info) {
	return {
		name: info.name,
		type: info.type.toLowerCase(),
		default: info.dflt_value,
		isNullable: !Boolean(info.notnull),
		isPrimaryKey: Boolean(info.pk),
		isUnique: Boolean(info.pk),
	};
}

export function parse(def) {
	const column = [`"` + def.name + `"`];

	if (def.isAutoIncrement) {
		column.push(`INTEGER PRIMARY KEY AUTOINCREMENT`);
	} else {
		column.push(def.type ? def.type.toUpperCase() : "TEXT");

		if (def.isPrimaryKey) {
			column.push("PRIMARY KEY NOT NULL");
		} else if (def.isNullable === false) {
			column.push("NOT NULL");
		}

		if (def.default) {
			column.push(`DEFAULT (${def.default})`);
		}
	}

	return column.join(" ");
}

export function toSQL(definitions) {
	const defs = definitions.map(parse).join(", ");
	const uniques = definitions
		.filter(e => e.isUnique)
		.map(e => e.name)
		.join(", ");

	return defs + (uniques && `, UNIQUE (${uniques})`);
}
