import FieldsMap from "../utils/FieldsMap";
import $is from "./$is.js";
import $not from "./$not.js";
import $or from "./$or.js";
import $and from "./$and.js";
import $isNull from "./$isNull.js";
import $lt from "./$lt.js";
import $lte from "./$lte.js";
import $gt from "./$gt.js";
import $gte from "./$gte.js";
import $in from "./$in.js";
import $notIn from "./$notIn.js";
import $match from "./$match.js";
import $like from "./$like.js";
import $notLike from "./$notLike.js";
import $sql from "./$sql.js";
import $between from "./$between.js";

const operators = new FieldsMap();

operators.add("$is", $is);
operators.add("$eq", $is);
operators.add("$equal", $is);

operators.add("$not", $not);
operators.add("$ne", $not);
operators.add("$notEqual", $not);

operators.add("$or", $or);
operators.add("$and", $and);

operators.add("$lt", $lt);
operators.add("$lte", $lte);
operators.add("$gt", $gt);
operators.add("$gte", $gte);
operators.add("$isNull", $isNull);

operators.add("$in", $in);
operators.add("$nin", $notIn);
operators.add("$notIn", $notIn);
operators.add("$between", $between);

operators.add("$like", $like);
operators.add("$notLike", $notLike);
operators.add("$nlike", $notLike);
operators.add("$match", $match);

operators.add("$sql", $sql);

export default operators;
