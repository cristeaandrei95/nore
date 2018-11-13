import xql from "xql";

const ctx = xql.dialect.newContext({ dialect: "sqlite" });

xql.node.QueryStatement.prototype.toSQL = function toSQL() {
	return this.compileStatement(ctx);
};

export default xql;
