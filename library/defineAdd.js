
const u = require("wlj-utilities");

const defineFunction = require("./defineFunction");
const variable = require("./variable");
const type = require("./type");
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
                variable('x', type('int', types)),
                variable('y', type('int', types)),
            ],
            [
                variable('sum', type('int', types)),
            ],
            evaluate('sum=x+y')
        );
    });
    return result;
}
