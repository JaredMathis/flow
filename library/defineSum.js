
const u = require("wlj-utilities");

module.exports = defineSum;

function defineSum() {
    let result;
    u.scope(defineSum.name, x => {        
        result = defineFunction(
            'sum', 
            [
                variable('x', typeArray('int')),
            ],
            [
                variable('result', typeInt()),
            ],
            evaluate('sum=x+y')
        );
    });
    return result;
}
