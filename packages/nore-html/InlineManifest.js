function getChunkByName(chunks, name) {
	return chunks.filter(chunk => chunk.name && chunk.name === name)[0];
}

export default class InlineManifest {
	constructor({ name }) {
		this.name = name || "manifest";
	}

	apply(compiler) {
		const { name } = this;

		compiler.hooks.emit.tap("InlineManifest", compilation => {
			delete compilation.assets[getChunkByName(compilation.chunks, name)];
		});

		compiler.hooks.compilation.tap("InlineManifest", compilation => {
			const alterTags = compilation.hooks.htmlWebpackPluginAlterAssetTags;

			alterTags.tapAsync("InlineManifest", (data, cb) => {
				const manifest = getChunkByName(compilation.chunks, name);

				if (manifest.files && manifest.files.length) {
					const file = manifest.files[0];
					const source = compilation.assets[file].source();

					data.body = data.body.map(script => {
						if (script.attributes.src.includes(file)) {
							return {
								tagName: "script",
								closeTag: true,
								innerHTML: source,
								attributes: {
									type: "text/javascript",
								},
							};
						}

						return script;
					});
				}

				cb(null, data);
			});
		});
	}
}
