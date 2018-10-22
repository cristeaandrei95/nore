import { QueryTypesMap } from "../helpers.js";
import insert from "./insert.js";
import select from "./select.js";
import update from "./update.js";
import delete_ from "./delete.js";

const queryTypes = new QueryTypesMap();

queryTypes.add("insert", insert);
queryTypes.add("select", select);
queryTypes.add("update", update);
queryTypes.add("delete", delete_);

export default queryTypes;
