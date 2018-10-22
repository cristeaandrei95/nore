import { QueryFieldsMap } from "../helpers.js";
import $is from "./$is.js";
import $not from "./$not.js";
import $or from "./$or.js";
import $and from "./$and.js";
import $null from "./$null.js";
import $lt from "./$lt.js";
import $lte from "./$lte.js";
import $gt from "./$gt.js";
import $gte from "./$gte.js";
import $in from "./$in.js";
import $nin from "./$nin.js";
import $like from "./$like.js";
import $nlike from "./$nlike.js";
import $sql from "./$sql.js";
import $between from "./$between.js";

const operators = new QueryFieldsMap();

operators.add("$is", $is);
operators.add("$eq", $is);
operators.add("$not", $not);
operators.add("$ne", $not);
operators.add("$or", $or);
operators.add("$and", $and);
operators.add("$null", $null);
operators.add("$lt", $lt);
operators.add("$lte", $lte);
operators.add("$gt", $gt);
operators.add("$gte", $gte);
operators.add("$in", $in);
operators.add("$nin", $nin);
operators.add("$like", $like);
operators.add("$nlike", $nlike);
operators.add("$sql", $sql);
operators.add("$between", $between);

export default operators;
