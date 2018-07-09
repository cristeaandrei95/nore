import { lstat, rmdir, readdir } from "fs";
import { join } from "../path";
import { isString } from "../assert";
import { ArgumentError, SystemError } from "../error";
import deleteFile from "./deleteFile";

function delPath(path) {
	return new Promise((resolve, reject) => {
		lstat(path, (error, stat) => {
			if (error) {
				// if `path` doesn't exist, the desired action is fulfilled
				if (error.code === "ENOENT") {
					resolve(path);
				} else {
					reject(error);
				}
			} else if (stat.isDirectory()) {
				resolve(delDirectory(path));
			} else {
				resolve(deleteFile(path));
			}
		});
	});
}

function delDirectory(path, callback) {
	return new Promise((resolve, reject) => {
		rmdir(path, error => {
			if (error) {
				if (error.code === "ENOTEMPTY") {
					delDirectoryContent(path)
						.then(() => {
							resolve(delDirectory(path));
						})
						.catch(reject);
				} else {
					reject(error);
				}
			} else {
				resolve(path);
			}
		});
	});
}

function delDirectoryContent(path) {
	return new Promise((resolve, reject) => {
		readdir(path, (error, files) => {
			if (error) {
				reject(error);
			} else {
				const pathsToDelete = files.map(
					// delete paths in parallel
					file => delPath(join(path, file))
				);

				resolve(Promise.all(pathsToDelete));
			}
		});
	});
}

export default function deleteDirectory(path) {
	return new Promise((resolve, reject) => {
		if (!isString(path)) {
			return reject(new ArgumentError("path", "string", path));
		}

		delPath(path)
			.then(resolve)
			.catch(error => {
				reject(
					new SystemError({
						type: "file_system",
						code: error.code,
						cause: error,
					})
				);
			});
	});
}
