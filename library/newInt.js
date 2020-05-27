
const u = require("wlj-utilities");

module.exports = newInt;

function newInt(value) {
    let result;
    u.scope(newInt.name, x => {
        u.merge(x, {value});
        u.assert(() => u.isString(value));

        let i = parseInt(value, 10);
        u.merge(x, {i});
        u.assert(() => u.isInteger(i));
        
        result = {
            $type: 'newInt',
            value: i,
        };
    });
    return result;
}
