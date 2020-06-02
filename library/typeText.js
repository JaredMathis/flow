
const u = require("wlj-utilities");
const typeList = require("./typeList");
const typeChar = require("./typeChar");

module.exports = typeText;

function typeText() {
    let result;
    u.scope(typeText.name, x => {
        result = typeList(typeChar());
    });
    return result;
}
