
const u = require("wlj-utilities");

module.exports = block;

function block(variables, statement) {
    let result;
    u.scope(block.name, x => {
        u.assert(() => u.isArray(variables));
        u.assert(() => u.isDefined(statement));

        result = {
            $type: 'block',
            variables,
            statement,
        }
    });
    return result;
}
