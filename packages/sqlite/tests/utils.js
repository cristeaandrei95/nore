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
