
const u = require("wlj-utilities");
const defineAdd = require("./defineAdd");
const defineCount = require("./defineCount");
const defineSum = require("./defineSum");
const defineAverage = require("./defineAverage");
const defineDivide = require("./defineDivide");

module.exports = getLibrary;

function getLibrary() {
    let result;
    u.scope(getLibrary.name, x => {
        result = [
            defineAdd(),
            defineDivide(),
            defineCount(),
            defineSum(),
            defineAverage(),
        ];
    });
    return result;
}
