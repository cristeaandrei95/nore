import HTMLPlugin from "html-webpack-plugin";
import sourceMappingURL from "source-map-url";

function getAssetName(chunks, chunkName) {
	const chunk = chunks.filter(c => c.name === chunkName).shift();

	return chunk && chunk.files ? chunk.files[0] : null;
}

export default class InlineWebpackRuntime {
	constructor(name) {
		this.name = name || "runtime";
		this.namespace = "InlineWebpackRuntime";
	}

	apply(compiler) {
		const { name, namespace } = this;

		compiler.hooks.emit.tap(namespace, function(compilation) {
			delete compilation.assets[getAssetName(compilation.chunks, name)];
		});

		compiler.hooks.compilation.tap(namespace, function(compilation) {
			const hooks = HTMLPlugin.getHooks(compilation);

			hooks.alterAssetTags.tapAsync(namespace, onAlterTags);
			hooks.beforeAssetTagGeneration.tapAsync(namespace, onBeforeTagGeneration);

			function onAlterTags(data, cb) {
				const { assetTags } = data;
				const manifestAssetName = getAssetName(compilation.chunks, name);

				if (manifestAssetName) {
					const runtime = {
						tagName: "script",
						closeTag: true,
						attributes: {
							type: "text/javascript",
						},
						innerHTML: sourceMappingURL.removeFrom(
							compilation.assets[manifestAssetName].source()
						),
					};

					assetTags.scripts = [runtime].concat(assetTags.scripts);
				}

				cb(null, data);
			}

			function onBeforeTagGeneration(htmlData, cb) {
				const runtime = [];
				const assets = htmlData.assets;
				const manifestAssetName = getAssetName(compilation.chunks, name);

				if (manifestAssetName && htmlData.plugin.options.inject === false) {
					const source = sourceMappingURL.removeFrom(
						compilation.assets[manifestAssetName].source()
					);

					const runtimeIndex = assets.js.indexOf(
						assets.publicPath + manifestAssetName
					);

					if (runtimeIndex >= 0) {
						assets.js.splice(runtimeIndex, 1);

						if (assets.chunks) {
							delete assets.chunks[name];
						}
					}

					assets.runtime = `<script>${source}</script>`;
				}

				cb(null, htmlData);
			}
		});
	}
}
