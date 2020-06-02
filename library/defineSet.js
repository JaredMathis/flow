
const u = require("wlj-utilities");
const defineFunction = require("./defineFunction");
const variable = require("./variable");
const typeText = require("./typeText");
const evaluate = require("./evaluate");

module.exports = defineSet;

function defineSet() {
    let result;
    u.scope(defineSet.name, x => {
        result = defineFunction(
            'get', 
            [
                variable('location', typeText()),
            ],
            [
                variable('result', typeText()),
            ],
            evaluate('result=getInMemory(location)')
        );
    });
    return result;
}
