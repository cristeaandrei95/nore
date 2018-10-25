import { isAbsolute, join } from "@nore/std/path";
import stats from "./stats.js";

export default class VirtualModule {
	constructor({ name, source }) {
		// webpack plugin name
		this.namespace = this.constructor.name;
		this.compiler = null;
		this.watcher = null;

		this.name = name;
		this.source = source;
		this.file = null;
	}

	apply(compiler) {
		const { hooks, inputFileSystem } = compiler;

		this.compiler = compiler;

		// create inputFileSystem helper methods
		hooks.afterEnvironment.tap(this.namespace, () => {
			if (inputFileSystem._virtualFiles) return;

			inputFileSystem._virtualFiles = new Map();

			inputFileSystem._writeVirtualFile = function(file, source, stats) {
				this._virtualFiles.set(file, { source, stats });
				this._readFileStorage.data.set(file, [null, source]);
				this._statStorage.data.set(file, [null, stats]);
			};

			// save original method that will be overwritten
			const $purge = inputFileSystem.purge;

			inputFileSystem.purge = function(what) {
				// trigger the original purge
				$purge.call(this, what);

				// add the virtual files back after the purge
				for (const [file, { source, stats }] of this._virtualFiles) {
					this._readFileStorage.data.set(file, [null, source]);
					this._statStorage.data.set(file, [null, stats]);
				}
			};
		});

		hooks.afterResolvers.tap(this.namespace, () => {
			if (!inputFileSystem._virtualFiles) return;
			if (inputFileSystem._virtualFiles.has(this.file)) return;

			this.write(this.name, this.source);
		});
	}

	write(name, source) {
		if (!this.compiler) return;

		this.name = name;
		this.source = source;
		this.file = isAbsolute(name) ? name : join(this.compiler.context, name);

		this.compiler.inputFileSystem._writeVirtualFile(
			this.file,
			this.source,
			stats(this.source)
		);

		if (this.compiler.watchFileSystem) {
			this.emitChange();
		}
	}

	emitChange() {
		const { fileWatchers } = this.compiler.watchFileSystem.watcher;

		for (const fileWatcher of fileWatchers) {
			if (fileWatcher.path === this.file) {
				fileWatcher.emit("change", new Date(), null);
			}
		}
	}
}
