
const u = require("wlj-utilities");

const assertIsFlowName = require("./assertIsFlowName");

module.exports = assertIsFunction;

function assertIsFunction(fn) {
    let result;
    u.scope(assertIsFunction.name, x => {
        u.merge(x, {fn});

        u.assert(() => u.isDefined(fn));

        assertIsFlowName(fn.name);
        
        u.assert(() => u.isArray(fn.inputs));
        // TODO: assert each input

        u.assert(() => u.isArray(fn.outputs));
        // TODO: assert each output

        u.assert(() => u.isDefined(fn.statement));
        // TODO: do a more thorough assert on the statement
    });
    return result;
}
