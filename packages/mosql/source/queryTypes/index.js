import { parseQueryType } from "../helpers.js";
import select from "./select.js";

const queryTypes = new Map();

queryTypes.add = (type, template) => {
	queryTypes.set(type, parseQueryType(template));
};

queryTypes.add("select", select);

export default queryTypes;
