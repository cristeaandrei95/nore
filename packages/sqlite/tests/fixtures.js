import { rndStr, getTemporaryFile, getRandomData } from "./util";
import Database from "../source";

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
