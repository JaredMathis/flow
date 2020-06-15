
const u = require("wlj-utilities");

const defineFunction = require("./defineFunction");
const variable = require("./variable");
const typeInt = require("./typeInt");
const typeList = require("./typeList");
const steps = require("./steps");
const set = require("./set");
const newInt = require("./newInt");
const loop = require("./loop");
const execute = require("./execute");

module.exports = defineAverage;

function defineAverage() {
    let result;
    u.scope(defineAverage.name, x => {    
        result = defineFunction(
            'average', 
            [
                variable('list', typeList(typeInt())),
            ],
            [
                variable('result', typeInt()),
            ],
            [
                variable('s', typeInt()),
                variable('c', typeInt()),
            ],
            steps([
                execute('sum', 
                    {'list':'list'},
                    {'result':'s'}
                ),
                execute('count', 
                    {'list':'list'},
                    {'result':'c'}
                ),
                execute('divide', 
                    {'x':'s','y':'c'},
                    {'result':'result'}
                ),
            ]),
        );
    });
    return result;
}
