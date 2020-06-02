
const u = require("wlj-utilities");

module.exports = typeChar;

function typeChar() {
    let result;
    u.scope(typeChar.name, x => {
        result = {
            $type: 'typeChar',
        };
    });
    return result;
}
