import $with from "./with.js";
import columns from "./columns.js";
import table from "./table.js";
import where from "./where.js";

const queryFields = new Map();

queryFields.set("with", $with);
queryFields.set("columns", columns);
queryFields.set("table", table);
queryFields.set("where", where);

export default queryFields;
