
const u = require("wlj-utilities");

const defineFunction = require("./defineFunction");
const variable = require("./variable");
const typeInt = require("./typeInt");
const evaluate = require("./evaluate");
const getTypes = require("./getTypes");

module.exports = defineAdd;

function defineAdd() {
    let result;
    u.scope(defineAdd.name, x => {
        types = getTypes();
        
        result = defineFunction(
            'add', 
            [
                variable('x', typeInt()),
                variable('y', typeInt()),
            ],
            [
                variable('sum', typeInt()),
            ],
            evaluate('sum=x+y')
        );
    });
    return result;
}
