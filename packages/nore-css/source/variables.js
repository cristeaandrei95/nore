import postcss from "postcss";

function format(value) {
	// trim whitespace
	value = value.trim();
	// remove surrounding quotes
	value = value.replace(/^"(.*)"$/, "$1");

	return value;
}

function definition(variables, node) {
	const name = node.prop.slice(1);
	variables[name] = format(node.value);
	node.remove();
}

function getVariable(variables, node, str, name, options, result) {
	if (typeof variables[name] !== "undefined") {
		return variables[name];
	}

	if (options.silent) {
		return str;
	}

	var fix = options.unknown(node, name, result);

	if (fix) {
		return fix;
	}

	return str;
}

function simpleSyntax(variables, node, str, options, result) {
	const onMatch = (_, bef, name) =>
		bef + getVariable(variables, node, "$" + name, name, options, result);

	return str.replace(/(^|[^\w])\$([\w\d-_.]+)/g, onMatch);
}

function inStringSyntax(variables, node, str, options, result) {
	return str.replace(/\$\(\s*([\w\d-_.]+)\s*\)/g, (all, name) =>
		getVariable(variables, node, all, name, options, result)
	);
}

function bothSyntaxes(variables, node, str, options, result) {
	str = simpleSyntax(variables, node, str, options, result);
	str = inStringSyntax(variables, node, str, options, result);

	return str;
}

function repeat(value, callback) {
	var oldValue;
	var newValue = value;

	do {
		oldValue = newValue;
		newValue = callback(oldValue);
	} while (newValue !== oldValue && newValue.includes("$"));

	return newValue;
}

function declValue(variables, node, options, result) {
	node.value = repeat(node.value, value =>
		bothSyntaxes(variables, node, value, options, result)
	);
}

function declProp(variables, node, options, result) {
	node.prop = repeat(node.prop, value =>
		inStringSyntax(variables, node, value, options, result)
	);
}

function ruleSelector(variables, node, options, result) {
	node.selector = repeat(node.selector, value =>
		bothSyntaxes(variables, node, value, options, result)
	);
}

function atruleParams(variables, node, options, result) {
	node.params = repeat(node.params, value =>
		bothSyntaxes(variables, node, value, options, result)
	);
}

function comment(variables, node, options, result) {
	node.text = node.text.replace(/<<\$\(\s*([\w\d-_]+)\s*\)>>/g, (all, name) =>
		getVariable(variables, node, all, name, options, result)
	);
}

export default postcss.plugin("variables", (options = {}) => {
	if (!options.unknown) {
		options.unknown = function(node, name) {
			throw node.error("Undefined variable $" + name);
		};
	}

	let variables = {};

	const plugin = function(css, result) {
		css.walk(function(node) {
			const { type, value, prop, selector, params } = node;

			if (type == "decl") {
				if (prop.includes("$(")) {
					declProp(variables, node, options, result);
				} else if (prop[0] === "$") {
					definition(variables, node);
				}
				if (value.toString().includes("$")) {
					declValue(variables, node, options, result);
				}
			}

			if (type == "rule") {
				if (selector.includes("$")) {
					ruleSelector(variables, node, options, result);
				}
			}

			if (type == "atrule") {
				if (params && params.includes("$")) {
					atruleParams(variables, node, options, result);
				}
			}
		});
	};

	plugin.setVariables = data => {
		variables = data;
	};

	return plugin;
});
