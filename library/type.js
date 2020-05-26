
const u = require("wlj-utilities");
const assertIsValidType = require("./assertIsValidType");

module.exports = type;

function type(name, types) {
    let result;
    u.scope(type.name, x => {
        assertIsValidType(name, types);

        result = name;
    });
    return result;
}
