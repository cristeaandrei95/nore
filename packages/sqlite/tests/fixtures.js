import { rndStr, rndInt, getTemporaryFile } from "./utils";



export default count => {
	const tableName = rndStr();
	const dbFile = getTemporaryFile();
	const db =



	const samples = getRandomData(columns, count);

	return { dbFile, db, tableName, columns, samples };
};
