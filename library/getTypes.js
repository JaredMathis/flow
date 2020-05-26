
const u = require("wlj-utilities");
const getTypesPath = require("./getTypesPath");

module.exports = getTypes;

function getTypes() {
    let result;
    u.scope(getTypes.name, x => {
        let path = getTypesPath();
        u.merge(x,{path});
        let json = u.readFile(path);
        u.merge(x,{json});
        let parsed = JSON.parse(json);
        result = parsed;
    });
    return result;
}
