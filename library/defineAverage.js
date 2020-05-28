
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
const block = require("./block");

module.exports = defineAverage;

function defineAverage() {
    let result;
    u.scope(defineAverage.name, x => {    
        result = defineFunction(
            'average', 
            [
                variable('array', typeList(typeInt())),
            ],
            [
                variable('result', typeInt()),
            ],
            block(
                [
                    variable('s', typeInt()),
                    variable('c', typeInt()),
                ],
                steps([
                    execute('sum', 
                        {'array':'array'},
                        {'result':'s'}
                    ),
                    execute('count', 
                        {'array':'array'},
                        {'result':'c'}
                    ),
                    execute('divide', 
                        {'x':'s','y':'c'},
                        {'result':'result'}
                    ),
                ]),
            ),
        );
    });
    return result;
}
