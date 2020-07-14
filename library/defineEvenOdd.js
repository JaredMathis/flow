
const u = require("wlj-utilities");
const typeText = require("./typeText");
const steps = require("./steps");
const ifElse = require("./ifElse");
const execute = require("./execute");
const set = require("./set");
const typeInt = require("./typeInt");
const evaluate = require("./evaluate");
const defineFunction = require("./defineFunction");
const variable = require("./variable");
const newText = require("./newText");

module.exports = defineEvenOdd;

function defineEvenOdd() {
    let result;
    u.scope(defineEvenOdd.name, x => {
        u.args(arguments);
        result = defineFunction(
            'evenOdd', 
            [
                variable('x', typeInt()),
            ],
            [
                variable('result', typeText()),
            ],
            [
                variable('m', typeInt()),
            ],
            steps([
                evaluate('m=x%2===0'),
                ifElse('m', 
                    steps([
                        set('result', newText('even'))
                    ]), 
                    steps([
                        set('result', newText('odd'))
                    ])
                )
            ])
        );
    });
    return result;
}
