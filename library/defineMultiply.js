
const u = require("wlj-utilities");

const defineFunction = require("./defineFunction");
const variable = require("./variable");
const typeInt = require("./typeInt");
const evaluate = require("./evaluate");

module.exports = defineMultiply;

function defineMultiply() {
    let result;
    u.scope(defineMultiply.name, x => {    
        result = defineFunction(
            'multiply', 
            [
                variable('x', typeInt()),
                variable('y', typeInt()),
            ],
            [
                variable('result', typeInt()),
            ],
            evaluate('result=x*y')
        );
    });
    return result;
}
