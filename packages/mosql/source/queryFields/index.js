import { QueryFieldsMap } from "../helpers.js";
import distinct from "./distinct.js";
import columns from "./columns.js";
import table from "./table.js";
import ifExists from "./ifExists.js";
import where from "./where.js";
import groupBy from "./groupBy.js";
import orderBy from "./orderBy.js";
import limit from "./limit.js";
import offset from "./offset.js";
import count from "./count.js";

const queryFields = new QueryFieldsMap();

queryFields.add("distinct", distinct);
queryFields.add("columns", columns);
queryFields.add("table", table);
queryFields.add("ifExists", ifExists);
queryFields.add("where", where);
queryFields.add("groupBy", groupBy);
queryFields.add("orderBy", orderBy);
queryFields.add("limit", limit);
queryFields.add("offset", offset);
queryFields.add("count", count);

export default queryFields;
