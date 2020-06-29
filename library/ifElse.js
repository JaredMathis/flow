
const u = require("wlj-utilities");

module.exports = ifElse;

function ifElse(condition, ifSteps, elseSteps) {
    let result;
    u.scope(ifElse.name, x => {
        result = {
            $type: 'ifElse',
            condition,
            ifSteps,
            elseSteps,
        }
    });
    return result;
}
