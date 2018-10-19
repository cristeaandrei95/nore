import $is from "./$is.js";
import $not from "./$not.js";
import $null from "./$null.js";
import $lt from "./$lt.js";
import $lte from "./$lte.js";
import $gt from "./$gt.js";
import $gte from "./$gte.js";
import $like from "./$like.js";
import $notLike from "./$notLike.js";
import $in from "./$in.js";
import $nin from "./$nin.js";
import $or from "./$or.js";
import $sql from "./$sql.js";

const operators = new Map();

operators.set("$is", $is);
operators.set("$not", $not);
operators.set("$eq", $is);
operators.set("$ne", $not);
operators.set("$null", $null);
operators.set("$lt", $lt);
operators.set("$lte", $lte);
operators.set("$gt", $gt);
operators.set("$gte", $gte);
operators.set("$in", $in);
operators.set("$nin", $nin);
operators.set("$like", $like);
operators.set("$notLike", $notLike);
operators.set("$or", $or);
operators.set("$sql", $sql);

export default operators;
