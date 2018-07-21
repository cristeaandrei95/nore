import webpack from "webpack";
import merge from "webpack-merge";
import { isArray } from "@nore/std/assert";

export default config => webpack(isArray(config) ? merge(...config) : config);
