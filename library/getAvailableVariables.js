
const u = require("wlj-utilities");
const getStatements = require("./getStatements");

module.exports = getAvailableVariables;

function getAvailableVariables(flow) {
    let result;
    u.scope(getAvailableVariables.name, x => {
        result = flow.inputs.concat(flow.outputs);

        if (flow.statement.$type === 'block') {
            result = result.concat(flow.statement.variables);
        }
    });
    return result;
}
