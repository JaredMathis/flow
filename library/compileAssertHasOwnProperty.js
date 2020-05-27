
const u = require("wlj-utilities");

module.exports = compileAssertHasOwnProperty;

function compileAssertHasOwnProperty(object, property) {
    let result;
    u.scope(compileAssertHasOwnProperty.name, x => {
        u.merge(x,{object});
        u.merge(x,{property});

        u.assert(() => u.isString(property));
        u.assert(() => object.hasOwnProperty(property));
    });
    return result;
}
