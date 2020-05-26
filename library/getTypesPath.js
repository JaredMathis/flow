
const u = require("wlj-utilities");

module.exports = getTypesPath;

function getTypesPath() {
    let result;
    u.scope(getTypesPath.name, x => {
        result = './types.json';
    });
    return result;
}
