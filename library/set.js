
const u = require("wlj-utilities");

module.exports = set;

function set(left, right) {
    let result;
    u.scope(set.name, x => {
        u.assert(() => u.isString(left));

        result = {
            $type: 'set',
            left,
            right,
        }
    });
    return result;
}
