
const u = require("wlj-utilities");

module.exports = typeBool;

function typeBool() {
    let result;
    u.scope(typeBool.name, x => {
        result = {
            $type: 'typeBool',
        };
    });
    return result;
}
