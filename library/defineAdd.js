
const u = require("wlj-utilities");

const defineFunction = require("./defineFunction");
const variable = require("./variable");
const typeInt = require("./typeInt");
const evaluate = require("./evaluate");

module.exports = defineAdd;

function defineAdd() {
    let result;
    u.scope(defineAdd.name, x => {        
        result = defineFunction(
            'add', 
            [
                variable('x', typeInt()),
                variable('y', typeInt()),
            ],
            [
                variable('result', typeInt()),
            ],
            [],
            evaluate('result=x+y')
        );
    });
    return result;
}
