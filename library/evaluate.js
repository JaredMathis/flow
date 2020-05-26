
const u = require("wlj-utilities");

module.exports = evaluate;

function evaluate(expression) {
    let result;
    u.scope(evaluate.name, x => {
        u.assert(() => u.isString(expression));
        result = {
            type: 'expression',
            expression,
        }
    });
    return result;
}
