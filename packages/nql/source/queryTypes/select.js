export default `
	SELECT {distinct} {count} {columns}
	FROM {table}
	{where}
	{groupBy}
	{orderBy}
	{limit}
	{offset}
`;
