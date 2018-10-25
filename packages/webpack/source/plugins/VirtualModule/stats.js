import constants from "constants";

class VirtualStats {
	constructor(settings) {
		Object.assign(this, settings);
	}

	// check if mode indicates property.
	_checkModeProperty(property) {
		return (this.mode & constants.S_IFMT) === property;
	}

	isDirectory() {
		return this._checkModeProperty(constants.S_IFDIR);
	}

	isFile() {
		return this._checkModeProperty(constants.S_IFREG);
	}

	isBlockDevice() {
		return this._checkModeProperty(constants.S_IFBLK);
	}

	isCharacterDevice() {
		return this._checkModeProperty(constants.S_IFCHR);
	}

	isSymbolicLink() {
		return this._checkModeProperty(constants.S_IFLNK);
	}

	isFIFO() {
		return this._checkModeProperty(constants.S_IFIFO);
	}

	isSocket() {
		return this._checkModeProperty(constants.S_IFSOCK);
	}
}

export default source => {
	const size = source ? source.length : 0;
	const time = Date.now();

	return new VirtualStats({
		size,
		blocks: Math.floor(size / 4096),
		atime: time,
		mtime: time,
		ctime: time,
		birthtime: time,
		dev: 8675309,
		nlink: 0,
		uid: 1000,
		gid: 1000,
		rdev: 0,
		blksize: 4096,
		mode: 33188,
	});
};
