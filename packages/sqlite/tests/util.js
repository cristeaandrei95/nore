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

export function getRandomData(columns, n = 100) {
	return Array.from(Array(n)).map(e => {
		const data = {};

		for (const key in columns) {
			const { name, type, isNullable, isPrimaryKey } = columns[key];

			data[name] = getValue(type, isNullable !== false && !isPrimaryKey);
		}

		return data;
	});
}

function getValue(type, isNullable) {
	if (isNullable && rndInt() < 50) return null;
	if (type == "real") return Math.random();
	if (type == "integer") return rndInt(10000, 999999999999);
	if (type == "text") return rndStr(rndInt(8, 32));
}
