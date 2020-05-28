
const u = require("wlj-utilities");

module.exports = block;

function block(variables, root) {
    let result;
    u.scope(block.name, x => {
        u.assert(() => u.isArray(variables));
        u.assert(() => variables.length >= 1);
        u.assert(() => u.isDefined(root));

        result = {
            $type: 'block',
            variables,
            root,
        }
    });
    return result;
}
