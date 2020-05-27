
const u = require("wlj-utilities");

module.exports = execute;

function execute(name, inputs, outputs) {
    let result;
    u.scope(execute.name, x => {
        u.merge(x,{name, inputs, outputs})
        u.assert(() => u.isString(name));
        u.assert(() => u.isDefined(inputs));
        u.assert(() => u.isDefined(outputs));

        result = {
            $type: 'execute',
            name,
            inputs,
            outputs,
        }
    });
    return result;
}
