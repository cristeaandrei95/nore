import yaml from "js-yaml";

export default function yamlLoader(source) {
	try {
		const content = yaml.safeLoad(source);
		const module = JSON.stringify(content);

		return `export default ${module}`;
	} catch (error) {
		this.emitError(error);
	}
}
