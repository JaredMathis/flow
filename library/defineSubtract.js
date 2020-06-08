
const u = require("wlj-utilities");

const defineFunction = require("./defineFunction");
const variable = require("./variable");
const typeInt = require("./typeInt");
const evaluate = require("./evaluate");

module.exports = defineSubtract;

function defineSubtract() {
    let result;
    u.scope(defineSubtract.name, x => {      
        result = defineFunction(
            'subtract', 
            [
                variable('x', typeInt()),
                variable('y', typeInt()),
            ],
            [
                variable('result', typeInt()),
            ],
            [],
            evaluate('result=x-y')
        );
    });
    return result;
}
