import postcss from "postcss";

function definition(variables, node) {
	const name = node.prop.slice(1);
	variables[name] = node.value;
	node.remove();
}

function variable(variables, node, str, name, options, result) {
	if (options.only) {
		if (typeof options.only[name] !== "undefined") {
			return options.only[name];
		}

		return str;
	}

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
	return str.replace(/(^|[^\w])\$([\w\d-_.]+)/g, function(_, bef, name) {
		return bef + variable(variables, node, "$" + name, name, options, result);
	});
}

function inStringSyntax(variables, node, str, options, result) {
	return str.replace(/\$\(\s*([\w\d-_.]+)\s*\)/g, function(all, name) {
		return variable(variables, node, all, name, options, result);
	});
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
	} while (newValue !== oldValue && newValue.indexOf("$") !== -1);
	return newValue;
}

function declValue(variables, node, options, result) {
	node.value = repeat(node.value, function(value) {
		return bothSyntaxes(variables, node, value, options, result);
	});
}

function declProp(variables, node, options, result) {
	node.prop = repeat(node.prop, function(value) {
		return inStringSyntax(variables, node, value, options, result);
	});
}

function ruleSelector(variables, node, options, result) {
	node.selector = repeat(node.selector, function(value) {
		return bothSyntaxes(variables, node, value, options, result);
	});
}

function atruleParams(variables, node, options, result) {
	node.params = repeat(node.params, function(value) {
		return bothSyntaxes(variables, node, value, options, result);
	});
}

function comment(variables, node, options, result) {
	node.text = node.text.replace(/<<\$\(\s*([\w\d-_]+)\s*\)>>/g, function(
		all,
		name
	) {
		return variable(variables, node, all, name, options, result);
	});
}

export default postcss.plugin("scss-variables", (options = {}) => {
	if (!options.unknown) {
		options.unknown = function(node, name) {
			throw node.error("Undefined variable $" + name);
		};
	}

	let variables = {};

	const plugin = function(css, result) {
		css.walk(function(node) {
			if (node.type === "decl") {
				if (node.value.toString().indexOf("$") !== -1) {
					declValue(variables, node, options, result);
				}
				if (node.prop.indexOf("$(") !== -1) {
					declProp(variables, node, options, result);
				} else if (node.prop[0] === "$") {
					if (!options.only) definition(variables, node);
				}
			} else if (node.type === "rule") {
				if (node.selector.indexOf("$") !== -1) {
					ruleSelector(variables, node, options, result);
				}
			} else if (node.type === "atrule") {
				if (node.params && node.params.indexOf("$") !== -1) {
					atruleParams(variables, node, options, result);
				}
			} else if (node.type === "comment") {
				if (node.text.indexOf("$") !== -1) {
					comment(variables, node, options, result);
				}
			}
		});

		Object.keys(variables).forEach(function(key) {
			result.messages.push({
				plugin: "postcss-scss-variables",
				type: "variable",
				name: key,
				value: variables[key],
			});
		});
	};

	plugin.setVariables = data => {
		variables = data;
	};

	return plugin;
});
