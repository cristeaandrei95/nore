export const up = `
	CREATE TABLE sessions (
		id TEXT PRIMARY KEY NOT NULL,
		token TEXT NOT NULL,
		session TEXT NOT NULL
	);

	INSERT INTO sessions (id, token, session) VALUES ('id', 'token', 'session');
`;

export const down = `
	DROP TABLE IF EXISTS sessions;
`;
