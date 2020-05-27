
const u = require("wlj-utilities");

module.exports = typeInt;

function typeInt() {
    let result;
    u.scope(typeInt.name, x => {
        result = {
            $type: 'typeInt',
        };
    });
    return result;
}
