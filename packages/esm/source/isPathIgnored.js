const { ES_NODE_MODULES } = process.env;
const allowed = ES_NODE_MODULES ? formatList(ES_NODE_MODULES) : [];
const node_modules = "/node_modules/";

function formatList(list) {
	return list.split(",").map(item => item.trim());
}

module.exports = function isPathIgnored(file) {
	if (file.includes(node_modules)) {
		for (const path of allowed) {
			if (file.includes(node_modules + path)) {
				return false;
			}
		}

		return true;
	}

	return false;
};
