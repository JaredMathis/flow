
const u = require("wlj-utilities");

module.exports = assertIsValidType;

function assertIsValidType(type, types) {
    let result;
    u.scope(assertIsValidType.name, x => {
        u.merge(x,{type})
        u.merge(x,{types})
        u.assert(() => u.isString(type));
        u.assert(() => u.isArray(types));
        u.assert(() => types.includes(type));
    });
    return result;
}
