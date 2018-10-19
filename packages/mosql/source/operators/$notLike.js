export default function $notLike({ column, cell }) {
	return `${column} NOT LIKE ${cell}`;
}
