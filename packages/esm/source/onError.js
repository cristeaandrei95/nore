module.exports = function onError({ file, error }) {
	const path = process.cwd();
	const filename = file.replace(path + "/", "");

	// handle non acorn errors
	if (!error.loc) {
		return console.log(error);
	}

	console.log(`
  Error parsing:
    ${filename} (${error.loc.line}:${error.loc.column})

  Error message:
    ${error.message}
  `);
};
