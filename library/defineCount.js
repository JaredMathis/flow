
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

module.exports = defineCount;

function defineCount() {
    let result;
    u.scope(defineCount.name, x => {    
        result = defineFunction(
            'count', 
            [
                variable('array', typeList(typeInt())),
            ],
            [
                variable('result', typeInt()),
            ],
            [
                variable('one', typeInt()),
            ],
            steps([
                set('result', newInt('0')),
                set('one', newInt('1')),
                loop('array', 'a', 'index',
                    execute('add', 
                        {'x':'result', 'y':'one'},
                        {'result':'result'}),
                    )
            ]),
        );
    });
    return result;
}
