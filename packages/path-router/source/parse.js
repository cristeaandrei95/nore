import trimSlashes from "./trimSlashes.js";

const characters = "[\\w\\!\\$&'\\(\\)\\*\\+\\,;\\=\\:@\\-\\.~]";
const encoded = "%[A-F0-9]{2}";

const wildcard = "(\\*)";
const optional = "(\\?)?";
const key = "(\\w+)";

// {key} {key?} {key*}, {key*2}
const param = `\\{${key}(?:${wildcard})?${optional}\\}`;
const literal = `(?:${characters}|${encoded})+`;
const segment = `(${literal})|(?:${param})`;

const regex = new RegExp(segment, "g");

export default path => {
	const segments = [];

	trimSlashes(path).replace(regex, setSegment);

	function setSegment(segment, literal, key, wildcard, optional) {
		segments.push({
			segment,
			literal,
			key,
			isOptional: Boolean(optional),
			isWildcard: Boolean(wildcard)
		});
	}

	return segments;
};
