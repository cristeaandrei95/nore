import { randomBytes } from "crypto";
import fs from "fs";
import os from "os";

export function getRandomString(n = 8) {
	// make sure the string starts with a letter not a number
	return "s" + randomBytes(n - 1).toString("hex");
}

export function getRandomInt(min = 1, max = 100) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function deleteDirectory(path) {
	if (fs.existsSync(path)) {
		for (const file of fs.readdirSync(path)) {
			const $path = path + "/" + file;
			const isDirectory = fs.lstatSync($path).isDirectory();

			isDirectory ? deleteDirectory($path) : fs.unlinkSync($path);
		}

		fs.rmdirSync(path);
	}
}

export function writeToFile(file, data) {
	return fs.writeFileSync(file, data);
}

export function getTemporaryDirectory() {
	const path = `${os.tmpdir()}/${getRandomString(12)}`;

	fs.mkdirSync(path);

	return { path, delete: () => deleteDirectory(path) };
}

export function getTemporaryFile() {
	const directory = getTemporaryDirectory();
	const path = `${directory.path}/${getRandomString(12)}`;

	return { path, delete: () => fs.unlinkSync(path) };
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
	if (canBeNull && getRandomInt() < 50) return null;
	if (type == "real") return Math.random();
	if (type == "integer") return getRandomInt(10000, 999999999999);
	if (type == "text") return getRandomString(getRandomInt(8, 32));
}
