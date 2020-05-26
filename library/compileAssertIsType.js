
const u = require("wlj-utilities");

module.exports = compileAssertIsType;

function compileAssertIsType(value, typeName) {
    let result;
    u.scope(compileAssertIsType.name, x => {
        u.merge(x,{value});
        u.merge(x,{typeName});

        u.assert(() => u.isDefined(value));
        
        if (typeName === 'int') {
            u.assert(() => u.isInteger(value));
            return;
        }
        if (typeName === 'char') {
            u.assert(() => u.isString(value));
            u.assert(() => value.length === 1);
            return;
        }
        assert(() => false);
    });
    return result;
}
