export default function $like({ column, cell }) {
	return `${column} LIKE ${cell}`;
}
