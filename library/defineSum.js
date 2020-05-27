
const u = require("wlj-utilities");
const defineFunction = require("./defineFunction");
const variable = require("./variable");
const typeList = require("./typeList");
const typeInt = require("./typeInt");
const steps = require("./steps");
const set = require("./set");
const newInt = require("./newInt");
const loop = require("./loop");
const execute = require("./execute");

module.exports = defineSum;

function defineSum() {
    let result;
    u.scope(defineSum.name, x => {        
        result = defineFunction(
            'sum', 
            [
                variable('array', typeList(typeInt())),
            ],
            [
                variable('result', typeInt()),
            ],
            steps([
                set('result', newInt('0')),
                loop('array', 'a', 'index',
                    execute('add', 
                        {'x':'result', 'y':'a'},
                        {'sum':'result'}),
                    )
            ]),
        );
    });
    return result;
}
