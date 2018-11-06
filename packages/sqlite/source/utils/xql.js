import xql from "xql";

const ctx = xql.dialect.newContext({ dialect: "sqlite" });

xql.node.Query.prototype.toSQL = function toSQL() {
	return this.compileQuery(ctx);
};

export default xql;

