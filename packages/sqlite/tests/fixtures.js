import { rndStr, rndInt, getTemporaryFile } from "./utils";
import Database from "../source";

function getRandomData(columns, n = 100) {
	return Array.from(Array(n)).map(e => {
		const data = {};

		for (const key in columns) {
			const { name, type, isNullable, isPrimaryKey } = columns[key];
			const canBeNull = isNullable !== false && !isPrimaryKey;

			data[name] = getRandomValue(type, canBeNull);
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

export default count => {
	const tableName = rndStr();
	const dbFile = getTemporaryFile();
	const db = new Database({ file: dbFile.path });

	const columns = [
		{ name: "id", type: "text", isPrimaryKey: true },
		{ name: "lorem", type: "text", isUnique: true },
		{ name: "ipsum", type: "real", default: 100 },
		{ name: "sit", type: "integer", isUnique: true },
	];

	const samples = getRandomData(columns, count);

	return { dbFile, db, tableName, columns, samples };
};
