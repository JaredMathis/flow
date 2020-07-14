
const u = require("wlj-utilities");

module.exports = ifElse;

function ifElse(condition, ifStatement, elseStatement) {
    let result;
    u.scope(ifElse.name, x => {
        result = {
            $type: 'ifElse',
            condition,
            ifStatement,
            elseStatement,
        }
    });
    return result;
}
