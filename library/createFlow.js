
const u = require("wlj-utilities");

module.exports = createFlow;

function createFlow(remaining) {
    let result;
    u.scope(createFlow.name, x => {
        u.assert(() => u.isArray(remaining));
        u.assert(() => remaining.length === 1);
        u.assert(() => u.isString(remaining[0]));

        let name = remaining[0];

        u.assert(() => !"TODO");
    });
    return result;
}
