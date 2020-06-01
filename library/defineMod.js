
const u = require("wlj-utilities");

const defineFunction = require("./defineFunction");
const variable = require("./variable");
const typeInt = require("./typeInt");
const evaluate = require("./evaluate");

module.exports = defineMod;

function defineMod() {
    let result;
    u.scope(defineMod.name, x => {    
        result = defineFunction(
            'mod', 
            [
                variable('x', typeInt()),
                variable('y', typeInt()),
            ],
            [
                variable('result', typeInt()),
            ],
            evaluate('result=x%y;')
        );
    });
    return result;
}
