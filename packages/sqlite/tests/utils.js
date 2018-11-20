import { randomBytes } from "crypto";
import { unlinkSync } from "fs";
import { tmpdir } from "os";

export function rndStr(n = 8) {
	// make sure the string starts with a letter not a number
	return "s" + randomBytes(n - 1).toString("hex");
}

export function rndInt(min = 1, max = 100) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTemporaryFile() {
	const path = `${tmpdir()}/${rndStr()}.sqlite`;
	return { path, delete: () => unlinkSync(path) };
}

export function getRandomData(definitions, n = 100) {
	return Array.from(Array(n)).map(e => {
		const data = {};

		for (const key in definitions) {
			const def = definitions[key];
			const canBeNull = def.isNullable !== false && !def.isPrimaryKey;

			// ignore foreign keys as the constraint will fail with no real reference
			if (def.foreignKey) continue;

			data[def.name] = getRandomValue(def.type, canBeNull);
		}

		return data;
	});
}

function getRandomValue(type, canBeNull) {
	if (canBeNull && rndInt() < 50) return null;
	if (type == "real") return Math.random();
	if (type == "integer") return rndInt(10000, 999999999999);
	if (type == "text") return rndStr(rndInt(8, 32));
}
