
const u = require("wlj-utilities");

module.exports = compileAssertIsType;

function compileAssertIsType(value, type) {
    let result;
    u.scope(compileAssertIsType.name, x => {
        u.merge(x,{value});
        u.merge(x,{type});

        u.assert(() => u.isDefined(value));
        u.assert(() => u.isDefined(type));
        u.assert(() => u.isDefined(type.$type));

        if (type.$type === 'typeInt') {
            u.assert(() => u.isInteger(value));
            return;
        }
        
        if (type.$type === 'char') {
            u.assert(() => u.isString(value));
            u.assert(() => value.length === 1);
            return;
        }

        if (type.$type === 'typeList') {
            u.assert(() => u.isArray(value));

            return;
        }
        u.assert(() => false);
    });
    return result;
}
