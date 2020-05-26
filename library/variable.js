
const u = require("wlj-utilities");

const assertIsValidType = require("./assertIsValidType");

module.exports = variable;

function variable(name, type) {
    let result;
    u.scope(variable.name, x => {
        u.merge(x,{name});
        u.merge(x,{type});
        u.assert(() => u.isString(name));

        result = {
            name,
            type,
        }
    });
    return result;
}
