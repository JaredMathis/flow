
const u = require("wlj-utilities");

const defineFunction = require("./defineFunction");
const typeText = require("./typeText");
const variable = require("./variable");
const evaluate = require("./evaluate");

module.exports = defineGet;

function defineGet() {
    let result;
    u.scope(defineGet.name, x => {
        result = defineFunction(
            'get', 
            [
                variable('location', typeText()),
            ],
            [
                variable('result', typeText()),
            ],
            evaluate('result=compileGetInMemory(location)')
        );
    });
    return result;
}
