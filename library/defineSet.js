
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
            'set', 
            [
                variable('location', typeText()),
                variable('value', typeText()),
            ],
            [
            ],
            evaluate('compileSetInMemory(location,value)')
        );
    });
    return result;
}
