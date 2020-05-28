
const u = require("wlj-utilities");

const defineFunction = require("./defineFunction");
const variable = require("./variable");
const typeInt = require("./typeInt");
const evaluate = require("./evaluate");

module.exports = defineDivide;

function defineDivide() {
    let result;
    u.scope(defineDivide.name, x => {        
        result = defineFunction(
            'divide', 
            [
                variable('x', typeInt()),
                variable('y', typeInt()),
            ],
            [
                variable('result', typeInt()),
            ],
            evaluate('result=Math.floor(x/y);')
        );
    });
    return result;
}
