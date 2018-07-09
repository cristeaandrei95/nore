import toml from "toml";

export default source => {
	const content = toml.parse(source);

	return "export default " + JSON.stringify(content);
};
