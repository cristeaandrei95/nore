import { resolve, relative, join, basename, dirname, extname } from "path";
// URL path helpers
import isAbsolute from "./isAbsolute.js";
import isRelative from "./isRelative.js";

export {
	extname as getExtension,
	dirname as getDirectory,
	basename as getFileName,
	resolve,
	relative,
	join,
	isAbsolute,
	isRelative,
};
