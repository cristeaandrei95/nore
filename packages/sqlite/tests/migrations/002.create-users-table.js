export const up = `
	CREATE TABLE users (
		id TEXT PRIMARY KEY NOT NULL,
		first_name TEXT NOT NULL,
		last_name TEXT NOT NULL
	);

	INSERT INTO users (id, first_name, last_name) VALUES ('id', 'first_name', 'last_name');
`;

export const down = `
	DROP TABLE IF EXISTS users;
`;
