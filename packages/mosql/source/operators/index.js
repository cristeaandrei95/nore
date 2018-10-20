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

const operators = new Map();

operators.set("$is", $is);
operators.set("$eq", $is);
operators.set("$not", $not);
operators.set("$ne", $not);
operators.set("$or", $or);
operators.set("$and", $and);
operators.set("$null", $null);
operators.set("$lt", $lt);
operators.set("$lte", $lte);
operators.set("$gt", $gt);
operators.set("$gte", $gte);
operators.set("$in", $in);
operators.set("$nin", $nin);
operators.set("$like", $like);
operators.set("$nlike", $nlike);
operators.set("$sql", $sql);

export default operators;
