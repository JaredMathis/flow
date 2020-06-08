
const u = require("wlj-utilities");
const getStatements = require("./getStatements");
const assertIsFlow = require("./assertIsFlow");

module.exports = getAvailableVariables;

function getAvailableVariables(flow) {
    let result;
    u.scope(getAvailableVariables.name, x => {
        assertIsFlow(flow);

        result = flow.inputs.concat(flow.outputs).concat(flow.variables);

        u.loop(flow.inputs, i => u.assert(() => u.isDefined(i)));
        u.loop(flow.outputs, o => u.assert(() => u.isDefined(o)));
        u.loop(flow.variables, v => u.assert(() => u.isDefined(v)));
        u.loop(result, r => u.assert(() => u.isDefined(r)));
    });
    return result;
}
