import FieldsMap from "../utils/FieldsMap";
import distinct from "./distinct.js";
import ifExists from "./ifExists.js";
import columns from "./columns.js";
import groupBy from "./groupBy.js";
import orderBy from "./orderBy.js";
import offset from "./offset.js";
import values from "./values.js";
import table from "./table.js";
import where from "./where.js";
import limit from "./limit.js";
import count from "./count.js";

const queryFields = new FieldsMap();

queryFields.add("distinct", distinct);
queryFields.add("ifExists", ifExists);
queryFields.add("columns", columns);
queryFields.add("groupBy", groupBy);
queryFields.add("orderBy", orderBy);
queryFields.add("offset", offset);
queryFields.add("values", values);
queryFields.add("table", table);
queryFields.add("where", where);
queryFields.add("limit", limit);
queryFields.add("count", count);

export default queryFields;
