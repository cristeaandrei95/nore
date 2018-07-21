import yaml from "js-yaml";

export default source => {
	const content = yaml.safeLoad(source);

	return "export default " + JSON.stringify(content);
};
