
const u = require("wlj-utilities");

module.exports = assertIsFunctionName;

function assertIsFunctionName(name) {
    let result;
    u.scope(assertIsFunctionName.name, x => {
        u.assert(() => u.isString(name));
        u.assert(() => name.length >= 1);
    });
    return result;
}
