
const u = require("wlj-utilities");

module.exports = getLibrary;

let result = [];

function getLibrary() {
    return result;
}

result.push(require("./defineAdd")());
result.push(require("./defineDivide")());
result.push(require("./defineCount")());
result.push(require("./defineSum")());
result.push(require("./defineAverage")());
result.push(require("./defineMultiply")());
result.push(require("./defineSubtract")());