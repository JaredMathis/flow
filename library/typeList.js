
const u = require("wlj-utilities");

module.exports = typeList;

function typeList(nested) {
    let result;
    u.scope(typeList.name, x => {
        result = {
            $type: 'typeList',
            nested,
        };
    });
    return result;
}
